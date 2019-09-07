// express server
const express = require("express");
// access to database
const mongoose = require("mongoose");
//The Path module provides a way of working with directories and file paths.
const path = require("path");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
// .env file
require("dotenv").config();

// access to database
const db = require("./models");


const app = express();
const PORT = process.env.PORT || 3001;

const youtubeAPI = process.env.youtubeAPI;
const lyricsAPI = process.env.lyricsAPI;

// console.log("youtubeAPI", youtubeAPI);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/musicSongLyrics", { useNewUrlParser: true });

function verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
            if (err) {
                res.status(401).json({
                    error: "Wrong token, please log in again."
                });
            } else {
                req.decoded = decod;
                next();
            }
        });
    } else {
        res.status(401).json({
            error: "Token not found, please log in again."
        });
    }
}

app.post('/signup', (req, res)=>{
    //console.log(req.body.username);
    db.User.find({name: req.body.username})
        .then((user) => {
            // console.log("user from db", user);  
            if (user.length > 0) {
                return res.status(406).json({ error: 'Username already exists' });
            }

            bcrypt.genSalt(10, function(err, salt) {
                if(err) return res.status(406).json({ error: err });

                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if(err) return res.status(406).json({ error: err });

                    db.User.create({
                        name: req.body.username,
                        password_hash: hash
                    }, function(error, user) {
                        // Log any errors
                        if (error) {
                            res.status(406).json({ error });
                        } else {
                            res.json({
                                message: 'Successfully signed up!'
                            });
                        }
                    });
                });
            });
        })
        .catch(err =>{
            console.log("error", err);
        });
});

app.post('/login', (req, res)=>{
    db.User.find({name: req.body.username})
        .then(user => {

            if(user.length == 0) 
                return res.status(404).json({ error: 'User not found' });

            if (!bcrypt.compareSync(req.body.password, user[0].password_hash)) 
                return res.status(401).json({ error: 'Incorrect password ' });
        
            let payload = {
                _id: user[0]._id,
                username: user[0].name,
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' }, (err, token)=>{
                if(err) return res.status(401).json({ error: err});

                return res.json({token});
            });
        })
        .catch(err =>{
            console.log("error", err);
            return res.status(404).json({ error: err });
        });
});

app.post('/userInfo', verifyToken, (req, res)=>{
    db.User.find({name: req.decoded.username})
        .populate("favorites")
        .populate("playlists")
        //.populate("songs")
        .then(u=>{
            res.json(u[0]);
        })
        .catch(err=>{
            console.log(err);
            res.status(403).json({error: err});
        });
});

// search song by name and artist
app.post('/search', verifyToken, (req, res)=>{
    let artist = req.body.songInfo.artist;
    let songName = req.body.songInfo.songName;
    let songInfo = {
        name : "",
        artist : "",
        thumbnail : "",
        video : "",
        lyrics : ""
    };

    let youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${artist}+${songName}&type=video&key=${youtubeAPI}`;

    let lyricsURL = `https://orion.apiseeds.com/api/music/lyric/${artist}/${songName}?apikey=${lyricsAPI}`;
    // console.log(youtubeURL);
    // console.log(lyricsURL);
    fetch(youtubeURL)
        .then(res => res.json())
        .then(response => {
            let result = response.items[0];
            songInfo.video = `https://www.youtube.com/embed/${result.id.videoId}`;
            songInfo.thumbnail = result.snippet.thumbnails.medium.url;

            fetch(lyricsURL)
                .then(res => res.json())
                .then(response => {
                    let info = response.result;
                    let lyrics = info.track.text;

                    songInfo.name = info.track.name;
                    songInfo.artist = info.artist.name;
                    songInfo.lyrics = lyrics;
                    res.json(songInfo);
                }).catch(err=>{
                    console.log("lyricsURL: lyrics not found. ",err);
                    res.status(404).json({error: "Lyrics not found"});
                });
        }).catch(error => {
            console.log("youtubeURL: music video not found. "+error);
            res.status(404).json({error: "Music Video not found"});
        });
});

// show all songs from favorite
// app.post('/favorite', verifyToken, (req, res)=>{

//     db.User.find({name: req.decoded.username})
//         .populate("favorites")
//         .then(user=>{
//             res.json(user[0]);
//         })
//         .catch(err=>{
//             console.log(err);
//             res.json(err);
//         });
// });

// find user and populate Favorite
function findUserAndPopulateFavorite(res, username){
    return db.User.find({name: username})
        .populate("favorites")
        .then(user=>{
            res.json(user[0]);
        })
        .catch(err=>{
            console.log("Error find user: ", err);
            res.status(404).json({error: "Error in finding user's info."});
        });
}

// // add song to favorite
app.post('/favorite/song', verifyToken, (req, res)=>{
    db.Song.find(req.body.songInfo)
        .then(result=>{
            if(result.length > 0){
                //$addToSet adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array
                db.User.findOneAndUpdate({name: req.decoded.username}, {"$addToSet": {"favorites": result[0]._id}}, { "new": true })
                    .then(user=>{
                        findUserAndPopulateFavorite(res, req.decoded.username);
                    })
                    .catch(err=>{
                        console.log("Error update user's favorite songs:", err);
                        res.status(404).json({error: "Error in updating user's Favorite songs."});
                    });
            }
            else{
                db.Song.create(req.body.songInfo)
                    .then(songInfo=>{
                        return db.User.findOneAndUpdate({name: req.decoded.username}, {"$push": {"favorites": songInfo._id}}, { "new": true });
                    })
                    .then(user=>{
                        findUserAndPopulateFavorite(res, req.decoded.username);
                    })
                    .catch(err=>{
                        console.log("Error create new song:", err);
                        res.status(404).json({error: "Error in adding new song."});
                    });
            }
        })
        .catch(error=>{
            console.log("Error finding song info: ",error);
            res.status(404).json({error: "Error in finding song info."});
        });
});

// remove song from favorite
app.delete('/favorite/song', verifyToken, (req, res)=>{

    db.User.findOneAndUpdate({name: req.decoded.username}, {"$pull": {"favorites": req.body.id}}, { "new": true })
        .then(user=>{
            findUserAndPopulateFavorite(res, req.decoded.username);
        })
        .catch(err=>{
            console.log("Error deleting song from favorite:", err);
            res.status(404).json({error: "Error in deleting song from favorite."});
        });
});

// create new playlist
app.post('/createPlaylist', verifyToken, (req, res)=>{
    let plName = req.body.plName;
    let user = req.decoded.username;
    db.Playlist.create({name: plName})
        .then(pl=>{
            return db.User.findOneAndUpdate({name: user}, {"$push": {"playlists": pl._id}}, { "new": true });
        })
        .then( u=>{
            db.User.find({name: user})
                .populate("playlists")
                .then(u => {
                    res.json(u[0]);
                })
                .catch(err => {
                    console.log("Error find user: ", err);
                    res.status(404).json({error: "Error in finding user's info."});
                });
        })
        .catch(err => {
            console.log("Error in creating new playlist: ", err);
            res.status(404).json({error: "Error in creating new playlist."});
        });
});

// select playlist and show songs
app.post('/playlist', verifyToken, (req, res)=>{
    let plID = req.body.plID;
    db.Playlist.find({_id: plID})
        .populate("songs")
        .then(playlist=>{
            res.json(playlist);
        })
        .catch(err=>{
            console.log("Error in finding playlist:", err);
            res.status(404).json({error: "Error in finding playlist."});
        });
});

// delete playlist
app.delete('/playlist', verifyToken, (req, res)=>{
    let plID = req.body.plID;
    let user = req.decoded.username;
    db.User.findOneAndUpdate({name: user}, {"$pull": {"playlists": plID}}, { "new": true })
        .populate("playlists")
        .then(user => {
            db.Playlist.findOneAndRemove({_id: plID}, err=> {
                if (err) res.json(err);

                res.json(user);
            });
        })
        .catch(err=>{
            console.log("Error deleting playlist:", err);
            res.status(404).json({error: "Error in deleting playlist."});
        });
});

// find playlist and populate songs
function findPlaylistAndPopulateSongs(res, plID){
    return db.Playlist.find({_id: plID})
        .populate("songs")
        .then(playlist=>{
            res.json(playlist[0]);
        })
        .catch(err=>{
            //res.json(err);
            console.log("Error in finding playlist:", err);
            res.status(404).json({error: "Error in finding playlist."});
        });
}

// add song to playlist
app.post('/playlist/song', verifyToken, (req, res)=>{
    let plID = req.body.plID;
    let songInfo = req.body.songInfo;

    db.Song.find(songInfo)
        .then(result=>{
            if(result.length > 0){
                //$addToSet adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array
                db.Playlist.findOneAndUpdate({_id: plID}, {"$addToSet": {"songs": result[0]._id}}, { "new": true })
                    .then(playlist=>{
                        findPlaylistAndPopulateSongs(res, plID);
                    })
                    .catch(err=>{
                        console.log("Error in finding and updating playlist:", err);
                        res.status(404).json({error: "Error in finding and updating playlist."});
                    });
            }
            else{
                db.Song.create(songInfo)
                    .then(song=>{
                        return db.Playlist.findOneAndUpdate({_id: plID}, {"$push": {"songs": song._id}}, { "new": true });
                    })
                    .then(pl=>{
                        findPlaylistAndPopulateSongs(res, plID);
                    })
                    .catch(err=>{
                        console.log("Error create new song:", err);
                        res.status(404).json({error: "Error in adding new song."});
                    });
            }
        })
        .catch(error=>{
            console.log("Error finding song info: ",error);
            res.status(404).json({error: "Error in finding song info."});
        });
});

// remove song from playlist
app.delete('/playlist/song', verifyToken, (req, res)=>{
    let plID = req.body.plID;
    let songID = req.body.songID;

    db.Playlist.findOneAndUpdate({_id: plID}, {"$pull": {"songs": songID}}, { "new": true })
        .then(playlist=>{
            findPlaylistAndPopulateSongs(res, plID);
        })
        .catch(err=>{
            console.log("Error deleting song from playlist:", err);
            res.status(404).json({error: "Error in deleting song from playlist."});
        });
});

// get all users info
app.get('/users', (req, res)=>{
    db.User.find({}, 'name')
        .then(users=>{
            res.send(users);
        })
        .catch(err=>{
            console.log(err);
            res.status(404).json({error: err});
        })
});

// get all songs info
app.get('/allsongs', (req, res)=>{
    db.Song.find({}, 'name artist')
    .then(songs=>{
        res.send(songs);
    }).catch(err=>{
        console.log('allsongs:', err);
        res.status(404).json({error: err});
    })
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(PORT, function() {
    console.log('🌎 ==> Now listening in PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});