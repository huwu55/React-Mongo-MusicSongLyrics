import axios from "axios";
export default {
    signup : function(user){
        return axios.post('/signup', user);
    },
    login : (user) => {
        return axios.post('/login', user);
    },
    userInfo : (token)=>{
        return axios.post('/userInfo', {token});
    },
    searchSong : (songInfo, token) => {
        return axios.post("/search", {songInfo, token});
    },
    getFavorite : (token) => {
        // console.log(token);
        return axios.post('/favorite', {token});
    },
    addToFav : (songInfo, token) => {
        return axios.post('/favorite/song', {songInfo, token});
    },
    delFromFav : (id, token) => {
        return axios.delete('/favorite/song', {data: {id, token}});
    },
    createPlaylist : (plName, token) => {
        return axios.post('/createPlaylist', {plName, token});
    },
    getPlaylist : (plID, token) => {
        return axios.post('/playlist', {plID, token});
    },
    deletePlaylist : (plID, token) => {
        return axios.delete('/playlist', {data: {plID, token}});
    },
    addToPlaylist : (plID, songInfo, token) => {
        return axios.post('/playlist/song', {plID, songInfo, token});
    },
    deleteFromPlaylist : (plID, songID, token) => {
        return axios.delete('/playlist/song', {data: {plID, songID, token}});
    }
};