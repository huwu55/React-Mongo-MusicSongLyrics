import React from "react";

export default (props) => {
    return (
        <div className="btn-group dropright">
            <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Add this song to playlist
            </button>
            <div className="dropdown-menu">

                {(props.playlists) && props.playlists.map((pl)=>(
                    <button className="dropdown-item" type="button" key={pl._id} onClick={()=>props.addToPlaylist(pl._id, pl.name)}>
                        {pl.name}
                    </button>
                ))}
            </div>
        </div>
    );

}