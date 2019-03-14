import React from "react";
import Navbar from "../components/Navbar";


export default () => {
    localStorage.removeItem('token');

    return (
        <div className="index">
            <Navbar />
            <div className="intro">
                <h1 className="title">Music, Song, &amp; Lyrics</h1>
                <p>Pair artist and song to retrieve music lyrics and a video for you to sing along</p>
                <p>Log in/Sign up to add your favorite songs</p>
            </div>
        </div>
    );
}