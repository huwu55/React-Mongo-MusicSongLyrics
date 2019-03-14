import React from "react";
import Song from "./Song";

export default (prop) => {
    return (
        <div>
            {(prop.songs) && prop.songs.map((song)=>(
                <div className="card" key={song._id}>
                    <Song 
                        id={song._id}
                        name={song.name}
                        artist={song.artist}
                        thumbnail={song.thumbnail}
                        lyrics={song.lyrics}
                        video={song.video}
                        playThis={prop.playThis}
                        deleteSong={prop.deleteSong}
                    />
                </div>
            ))}
        </div>
    );
}