import React from "react";
import Dropdown from "./DropdownMenu-Playlists";

export default (props) => {
    return (
        <div className="btn-group dropright">
            <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Add this song to playlist
            </button>

            <Dropdown 
                playlists={props.playlists}
                addToPlaylist={props.addToPlaylist}
                song={props.song}
                focusTextInput={props.focusTextInput}
            />
        </div>
    );

}