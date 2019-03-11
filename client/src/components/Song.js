import React from "react";

export default (prop) => {
    return (
        <div>
            <div className="card-image">
                <img className="card-img-top" src={prop.thumbnail} alt={prop.name}></img>
                <div className="card-btns">
                    <button id="delPlaylist" className="btn btn-outline-light" type="button" title="Play"><i className="fas fa-play"></i></button> 
                    <button id="delPlaylist" className="btn btn-outline-light" type="button" title="Delete"><i className="fas fa-times"></i></button> 
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{prop.name}</h5>
                <p className="card-text">{prop.artist}</p>           
            </div>
        </div>
    );
}