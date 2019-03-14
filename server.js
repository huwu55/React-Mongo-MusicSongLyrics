const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

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
    // console.log(req.body);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
            if (err) {
                res.status(403).json({
                    message: "Wrong Token"
                });
            } else {
                req.decoded = decod;
                next();
            }
        });
    } else {
        res.status(403).json({
            message: "No Token"
        });
    }
}

app.post('/signup', (req, res)=>{

    db.User.find({name: req.body.username})
        .then((user) => {
            // console.log("user from db", user);  
            if (user.length > 0) {
                return res.status(406).json({ error: 'Username already exists' });
            }
            if (!req.body.password) {
                console.log("no password");
                return res.status(401).json({ error: 'You need a password' });
            }
            if (req.body.password.length <= 5) {
                console.log("password length less than 5");
                return res.status(401).json({ error: 'Password length must be greater than 5' });
            }

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    // console.log("hash", hash);
                    db.User.create({
                        name: req.body.username,
                        password_hash: hash
                    }, function(error, user) {
                        // console.log(user._id);
                        // Log any errors
                        if (error) {
                            // console.log("error-inside", error);
                            res.send(error);
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

            if(user.length == 0) return res.status(404).json({ error: 'User not found' });
            if (!bcrypt.compareSync(req.body.password, user[0].password_hash)) return res.status(401).json({ error: 'Incorrect password ' });
        
            let payload = {
                _id: user._id,
                username: user.name,
            };

            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

            return res.json({
                message: 'successfuly authenticated',
                token: token
            });
        })
        .catch(err =>{
            console.log("error", err);
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

    axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
            q : `${artist}+${songName}`,
            maxResults: 1,
            part: "snippet",
            type: "video",
            key : youtubeAPI
        }
    }).then(response => {
        let result = response.data.items[0];
        // console.log(result);
        songInfo.video = `https://www.youtube.com/embed/${result.id.videoId}`;
        songInfo.thumbnail = result.snippet.thumbnails.medium.url;

        axios.get(`https://orion.apiseeds.com/api/music/lyric/${artist}/${songName}?apikey=${lyricsAPI}`)
            .then(response => {
                //console.log(response);
                let lyrics = response.data.result.track.text;

                songInfo.name = response.data.result.track.name;
                songInfo.artist = response.data.result.artist.name;
                songInfo.lyrics = lyrics;
                res.json(songInfo);
            }).catch(err=>{
                res.status(404).send("error");
                // res.json({error: "Lyrics not found"});
            });
    }).catch(error => {
        console.log(error);
        res.status(422).json(error);
    });
});

// // show all songs from favorite
app.post('/favorite', verifyToken, (req, res)=>{
    db.User.find({name: req.body.username})
        .populate("favorites")
        .then(user=>{
            // console.log(user[0]);
            res.json(user[0]);
        })
        .catch(err=>{
            res.json(err);
        });
});

// // add song to favorite
app.post('/favorite/song', verifyToken, (req, res)=>{
    // console.log(req.body.songInfo);
    // console.log("username::::::", req.body.username);

    db.Song.find(req.body.songInfo)
        .then(result=>{
            if(result.length > 0){
                //$addToSet adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array
                db.User.findOneAndUpdate({name: req.body.username}, {"$addToSet": {"favorites": result[0]._id}}, { "new": true })
                    .then(user=>{
                        db.User.find({name: req.body.username})
                            .populate("favorites")
                            .then(user=>{
                                res.json(user[0]);
                            })
                            .catch(err=>{
                                res.json(err);
                            });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.json(err);
                    });
            }
            else{
                db.Song.create(req.body.songInfo)
                    .then(songInfo=>{
                        return db.User.findOneAndUpdate({name: req.body.username}, {"$push": {"favorites": songInfo._id}}, { "new": true });
                    })
                    .then(user=>{
                        db.User.find({name: req.body.username})
                            .populate("favorites")
                            .then(user=>{
                                res.json(user[0]);
                            })
                            .catch(err=>{
                                res.json(err);
                            });
                    })
                    .catch(err=>{
                        res.json(err);
                    });
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(400).json(error);
        });
    // res.status(422).json("testing");
});

// // remove song from favorite
app.delete('/favorite/song', verifyToken, (req, res)=>{
    // console.log("hello world");
    // console.log(req.body.username);
    db.User.findOneAndUpdate({name: req.body.username}, {"$pull": {"favorites": req.body.id}}, { "new": true })
        .then(user=>{
            db.User.find({name: req.body.username})
                .populate("favorites")
                .then(user=>{
                    // console.log(user[0]);
                    res.json(user[0]);
                })
                .catch(err=>{
                    console.log(err);
                    res.json(err);
                });
        })
        .catch(err=>{
            console.log(err);
            res.json(err);
        });
});

// // create new playlist
// app.post('/createPlaylist', verifyToken, (req, res)=>{

// });

// // select playlist and show songs
// app.post('/playlist', verifyToken, (req, res)=>{

// });

// // delete playlist
// app.delete('/playlist', verifyToken, (req, res)=>{

// });

// // add song to playlist
// app.post('/playlist/song', verifyToken, (req, res)=>{

// });

// // remove song from playlist
// app.delete('/playlist/song', verifyToken, (req, res)=>{

// });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(PORT, function() {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});