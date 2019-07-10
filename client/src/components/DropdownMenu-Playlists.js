import React from "react";

export default (props) => {
    return (
        <div className="dropdown-menu">
            {props.playlists.length === 0 && document.createPL &&
                // <div>
                //     You don't have any playlist yet.
                // </div>
                //<button className="dropdown-item createPL" type="button" onClick={()=>{document.textInput.focus()}}>
                    <a className="dropdown-item createPL" href="#anchor-pl" onClick={()=>{document.textInput.focus()}}>
                        {/* <button className="dropdown-item createPL" type="button" onClick={()=>{document.textInput.focus()}}>
                            Create New Playlist
                        </button> */}
                        Create new playlist
                    </a>
                //</button>
            }
            {(props.playlists.length !== 0) && props.playlists.map((pl)=>(
                <button className="dropdown-item" type="button" key={pl._id} onClick={()=>props.addToPlaylist(pl._id, props.song)}>
                    {pl.name}
                </button>
            ))}
        </div>
    );

}