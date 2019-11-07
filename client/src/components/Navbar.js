import React from "react";

export default () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">MusicSongLyrics</a>

            <div className="navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <a className="nav-link" href="/login">Log In<span className="sr-only">(current)</span></a>
                    <a className="nav-link" href="/signup">Sign Up<span className="sr-only">(current)</span></a>
                </div>
            </div>
        </nav>
    );
}