import React from "react";

export default (prop) => {
    return (
        <div className="row videoinfo">
            <div className="col-8 video">
                <iframe id="youtube" frameBorder="0" allowFullScreen src={prop.song.video}></iframe>
                <button type="button" title="Add to Favorites" className="fav btn btn-light" onClick={()=>prop.addToFav()}>
                    <i className="fas fa-heart"></i>
                </button>
                {/* <button type="button" value="Add to Playlist" className="btn btn-dark"><i className="fas fa-book"></i> Add to the Selected Playlist</button> */}
            </div>
            <div className="col-4 lyrics">
                <textarea rows="20" col="1" disabled readOnly value={prop.song.lyrics}></textarea>
            </div>
        </div>
    );
}