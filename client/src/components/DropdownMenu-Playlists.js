import React from "react";

export default (props) => {
    return (
        <div className="dropdown-menu">
            {(props.playlists) && props.playlists.map((pl)=>(
                <button className="dropdown-item" type="button" key={pl._id} onClick={()=>props.addToPlaylist(pl._id, props.song)}>
                    {pl.name}
                </button>
            ))}
        </div>
    );

}