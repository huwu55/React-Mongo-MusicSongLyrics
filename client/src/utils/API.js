// import axios from "axios";
import fetch from 'node-fetch';
export default {
    signup : function(user){
        //return axios.post('/signup', user);
        return fetch('/signup', {
            method: "POST",
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    login : (user) => {
        //return axios.post('/login', user);
        return fetch('/login', {
            method: "POST",
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    userInfo : (token)=>{
        //return axios.post('/userInfo', {token});
        return fetch(`/userinfo?token=${token}`, {
            method: "GET"
        }).then(res => res.json());
    },
    searchSong : (songInfo, token) => {
        return fetch(`/search?token=${token}&artist=${songInfo.artist}&songName=${songInfo.songName}`, {
            method: "GET"
        }).then(res => res.json());
    },
    // getFavorite : (token) => {
    //     return axios.post('/favorite', {token});
    // },
    addToFav : (songInfo, token) => {
        //return axios.post('/favorite/song', {songInfo, token});
        return fetch('/favorite/song', {
            method: "PUT",
            body: JSON.stringify({songInfo, token}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    delFromFav : (id, token) => {
        //return axios.delete('/favorite/song', {data: {id, token}});
        return fetch('/favorite/song', {
            method: "DELETE",
            body: JSON.stringify({id, token}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    createPlaylist : (plName, token) => {
        //return axios.post('/createPlaylist', {plName, token});
        return fetch('/createPlaylist', {
            method: "POST",
            body: JSON.stringify({plName, token}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    getPlaylist : (plID, token) => {
        //return axios.post('/playlist', {plID, token});
        return fetch('/playlist', {
            method: "POST",
            body: JSON.stringify({plID, token}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    deletePlaylist : (plID, token) => {
        //return axios.delete('/playlist', {data: {plID, token}});
        return fetch('/playlist', {
            method: "DELETE",
            body: JSON.stringify({plID, token}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    addToPlaylist : (plID, songInfo, token) => {
        //return axios.post('/playlist/song', {plID, songInfo, token});
        return fetch('/playlist/song', {
            method: "POST",
            body: JSON.stringify({plID, songInfo, token}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    deleteFromPlaylist : (plID, songID, token) => {
        //return axios.delete('/playlist/song', {data: {plID, songID, token}});
        return fetch('/playlist/song', {
            method: "DELETE",
            body: JSON.stringify({plID, songID, token}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },

    // list all users' usernames
    getUsers : () => {
        return fetch('/users')
            .then(res => res.json());
    },
    getAllSongs : () => {
        return fetch('/allsongs')
            .then(res => res.json());
            //.then(res=>res.text());
    }
};