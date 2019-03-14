var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SongSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    artist : {
        type: String,
        required: true
    },
    thumbnail : {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    lyrics : {
        type: String
    }
});

var Song = mongoose.model("Song", SongSchema);
module.exports = Song;