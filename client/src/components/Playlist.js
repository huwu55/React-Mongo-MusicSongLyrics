import React from "react";
import Song from "./Song";

export default (prop) => {
    return (
        <div className="card-columns">
            {(prop.songs) && prop.songs.map((song)=>(
                <div className="card" key={song._id}>
                    <Song 
                        id={song._id}
                        name={song.name}
                        artist={song.artist}
                        thumbnail={song.thumbnail}
                    />
                </div>
            ))}
        </div>
    );
}