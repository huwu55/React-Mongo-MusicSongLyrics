import React from "react";
import AddToPlaylist from "./AddToPlaylist";

export default (prop) => {
    return (
        <div className="row videoinfo">
            <div className="col-8 video">
                <iframe id="youtube" frameBorder="0" allowFullScreen src={prop.song.video}></iframe>
                <button type="button" title="Add to Favorites" className="fav btn btn-light" onClick={()=>prop.addToFav()}>
                    <i className="fas fa-heart"></i>
                </button>

                <AddToPlaylist 
                    playlists={prop.playlists}
                    addToPlaylist={prop.addToPlaylist} 
                    song={prop.song}
                />
            </div>
            <div className="col-4 lyrics">
                <textarea rows="20" col="1" disabled readOnly value={prop.song.lyrics}></textarea>
            </div>
        </div>
    );
}