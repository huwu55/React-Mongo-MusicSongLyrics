import React from "react";

export default (props) => {
    return (
        <div id="playlist">
            <div className="wrapper">
                <select id="selectPlaylist" className="form-control" defaultValue="Favorite" onChange={props.selectPl}>
                    <option value="None">Please select a playlist</option>
                    <option value="Favorite">Favorite</option>
                    {(props.playlists) && props.playlists.map((pl)=>(
                        <option value={pl._id} key={pl._id}>
                            {pl.name}
                        </option>
                    ))}
                </select>
                <button disabled={!props.isPlaylist} id="delPlaylist" className="btn btn-outline-secondary" type="button" title="Delete this playlist" onClick={()=>props.deletePlaylist()}><i className="far fa-trash-alt"></i></button>
            </div>
            <form name="createPL" id="createNewPL" className="form-inline" onSubmit={props.createNewPlaylist}>
                <input id="createNewPLName" type="text" className="form-control" ref={ip=>{document.textInput = ip}} placeholder="New Playlist"></input>
                <button className="btn btn-dark" type="submit">Create</button>
            </form>
            {/* <button type='button' className='btn btn-outline-light' id="createNewPLButton" title='Create new playlist'><i className="fas fa-plus"></i></button> */}
        </div>
    );
}