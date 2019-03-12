import React from "react";
import Navbar from "../components/Navbar";

export default () => {
    return (
        <div className="index">
            <Navbar />
            <div className="intro">
                <h1 className="title">Music, Song, &amp; Lyrics</h1>
                <p>You've logged out!</p>
            </div>
        </div>
    );
}