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


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
//allow the api to be accessed by other apps
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//     next();
// });


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/musicSongLyrics", { useNewUrlParser: true });

function verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
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
    console.log(req.body);
    // console.log("hello");
    // res.send(true);
    db.User.find({name: req.body.username})
        .then((user) => {
            console.log("user from db", user);  
            if (user.length > 0) {
                // console.log("true");
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
            // console.log("user", user, user.length);
            // console.log("user0", user[0]);
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

// // search song by name and artist
// app.post('/search', verifyToken, (req, res)=>{

// });

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