import React from "react";

export default (prop) => {
    return (
        <div id="playlist" className="col-12">
            <select id="selectPlaylist" className="form-control">
                <option value="none">Please select a playlist</option>
                <option value="favorite">Favorite</option>
            </select>
            <button id="delPlaylist" className="btn btn-outline-secondary" type="button" title="Delete this playlist"><i className="far fa-trash-alt"></i></button>

            <form id="createNewPL" className="form-inline">
                <input type="text" className="form-control" placeholder="Enter playlist name"></input>
                <button className="btn btn-dark" type="button">Create new playlist</button>
            </form>
        </div>
    );
}