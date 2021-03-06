import React from "react";

export default (prop) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/home">MusicSongLyrics</a>

            <div className="navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <a className="nav-link active" href="/home">Welcome, {prop.username}!<span className="sr-only">(current)</span></a>
                    <a className="nav-link" href="/logout" onClick={() => prop.logout()}>Log Out<span className="sr-only">(current)</span></a>
                </div>
            </div>

            <form className="search form-inline" onSubmit={prop.search}>
                <input className="form-control mr-sm-2" type="search" placeholder="Artist"></input>
                <input className="form-control mr-sm-2" type="search" placeholder="Song Name"></input>
                <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit" disabled={prop.searching}>
                    {prop.searching === false && 
                        <span>Search</span>
                    }
                    {prop.searching &&
                        <span>
                            <div className="spinner-border spinner-border-sm"></div> &nbsp;
                            <span>Searching</span>
                        </span>
                    }
                </button>
            </form>
        </nav>
    );
}