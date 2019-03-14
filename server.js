const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const path = require("path");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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
            console.log("user from db", user);  
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
                        console.log(user._id);
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

// app.post('/home', verifyToken, (req, res)=>{

// });

// search song by name and artist
app.post('/search', verifyToken, (req, res)=>{
    let artist = req.body.songInfo.artist;
    let songName = req.body.songInfo.songName;

    let songInfo = {
        name : songName,
        artist : artist,
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

        axios({
            url: `/${artist}/${songName}?apikey=${lyricsAPI}`,
            method: "get",
            baseURL: "https://orion.apiseeds.com/api/music/lyric"
        })
        .then(response => {
            //console.log(response);
            let lyrics = response.data.result.track.text;
            // console.log(lyrics);
            songInfo.lyrics = lyrics;
            res.json(songInfo);
        }).catch(error=>{
            console.log(error);
            res.status(422).json(error);
        });
    }).catch(error => {
        console.log(error);
        res.status(422).json(error);
    });
});

// // show all songs from favorite
// app.post('/favorite', verifyToken, (req, res)=>{

// });

// // add song to favorite
// app.post('/favorite/song', verifyToken, (req, res)=>{

// });

// // remove song from favorite
// app.delete('/favorite/song', verifyToken, (req, res)=>{

// });

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