import React from "react";
import Dropdown from "./DropdownMenu-Playlists";

export default (prop) => {
    return (
        <div>
            <div className="card-image">
                <img className="card-img-top" src={prop.song.thumbnail} alt={prop.song.name}></img>
                <div className="card-btns">
                    <a title="Play" href="#anchor-video" onClick={()=>prop.playThis({
                        artist: prop.song.artist,
                        name: prop.song.name,
                        thumbnail: prop.song.thumbnail,
                        video: prop.song.video,
                        lyrics: prop.song.lyrics
                    })}>
                        <button className="features btn btn-outline-light" type="button">
                        <i className="fas fa-play"></i>
                        </button>
                    </a>
                    <button className="features btn btn-outline-light" type="button" title="Delete" onClick={()=>prop.deleteSong(prop.song._id)}>
                        <i className="fas fa-times"></i>
                    </button> 
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {prop.song.name} 

                    {prop.selectedPlaylist==="Favorite" && 
                        <div className="btn-group dropright">
                            <button className="btn btn-light dropdown" data-toggle="dropdown" type="button" title="Add song to playlist">
                                <i className="fas fa-plus"></i>
                            </button>
                            <Dropdown 
                                playlists={prop.playlists}
                                addToPlaylist={prop.addToPlaylist}
                                song={prop.song}
                            />
                        </div>
                    }
                </h5>
                <p className="card-text">{prop.song.artist}</p>           
            </div>
        </div>
    );
}