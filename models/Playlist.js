var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PlaylistSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song"
        }
    ]
});

var Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;