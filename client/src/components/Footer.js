import React from "react";

export default () => {
    return (
        <footer>
            <a className='visibleLink' href="/">React Mongo MusicSongLyrics</a> &copy;2019 &nbsp;
            <a className='visibleLink' title="Github" href="https://github.com/huwu55/React-Mongo-MusicSongLyrics" target="_blank" rel="noopener noreferrer">Huiling Wu &nbsp;<i className="fab fa-github"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a title="get all users" href="/users">API all users</a> &nbsp;&nbsp;
            <a title="get all songs" href="/songs">API all songs</a> &nbsp;&nbsp;
            <a title="get check ins" href="/checkIns">API Check Ins</a> &nbsp;&nbsp;
        </footer>
    );
}