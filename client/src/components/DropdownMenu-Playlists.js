import React from "react";

export default (props) => {
    return (
        <div className="dropdown-menu">
            {(props.playlists.length !== 0) && props.playlists.map((pl)=>(
                <button className="dropdown-item" type="button" key={pl._id} onClick={()=>props.addToPlaylist(pl._id, props.song)}>
                    {pl.name}
                </button>
            ))}            
            <a className="dropdown-item createPL" href="#anchor-pl" onClick={()=>{document.textInput.focus()}}>
                Create new playlist
            </a>
        </div>
    );

}