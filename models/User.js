var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    password_hash : {
        type: String,
        required: true
    },
    favorites : [
        {
            type: Schema.Types.ObjectId,
            ref: "Song"
        }
    ],
    playlists : [
        {
            type: Schema.Types.ObjectId,
            ref: "Playlist"
        }
    ]
});

var User = mongoose.model("User", UserSchema);
module.exports = User;