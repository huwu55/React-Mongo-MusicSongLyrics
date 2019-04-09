import React from "react";

export default (props) => {
    return (
        <div id="playlist" className="col-12">
            <select id="selectPlaylist" className="form-control" defaultValue="None" onChange={props.selectPl}>
                <option value="None">Please select a playlist</option>
                <option value="Favorite">Favorite</option>
                {(props.playlists) && props.playlists.map((pl)=>(
                    <option value={pl._id} key={pl._id}>
                        {pl.name}
                    </option>
                ))}
            </select>
            <button disabled={!props.isPlaylist} id="delPlaylist" className="btn btn-outline-secondary" type="button" title="Delete this playlist" onClick={()=>props.deletePlaylist()}><i className="far fa-trash-alt"></i></button>

            <form id="createNewPL" className="form-inline" onSubmit={props.createNewPlaylist}>
                <input type="text" className="form-control" placeholder="Enter playlist name"></input>
                <button className="btn btn-dark" type="submit">Create new playlist</button>
            </form>
        </div>
    );
}