import React from "react";
import Song from "./Song";

export default (prop) => {
    return (
        <div className="playlist">
            {(prop.songs) && [...prop.songs].reverse().map((song)=>(
                <div className="card" key={song._id}>
                    <Song 
                        song={song}
                        playThis={prop.playThis}
                        deleteSong={prop.deleteSong}
                        playlists={prop.playlists}
                        selectedPlaylist={prop.selectedPlaylist}
                        addToPlaylist={prop.addToPlaylist}
                    />
                </div>
            ))}
        </div>
    );
}