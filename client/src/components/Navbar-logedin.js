import React from "react";

export default (prop) => {
    return (
        <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/home">MusicSongLyrics</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <a className="nav-link active" href="/home">Welcome, {prop.username}!<span className="sr-only">(current)</span></a>
                    <a className="nav-link" href="/logout">Log Out<span className="sr-only">(current)</span></a>
                </div>
            </div>

        </nav>
    );
}