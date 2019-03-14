import axios from "axios";
export default {
    signup : function(user){
        return axios.post('/signup', user);
    },
    login : (user) => {
        return axios.post('/login', user);
    },
    // logout : () => {
    //     return axios.get('/logout');
    // },
    // home : () => {
    //     return axios.post('/home');
    // },
    searchSong : (songInfo, token) => {
        // console.log(songInfo);
        // console.log(token);
        // console.log({songInfo, token});
        return axios.post("/search", {songInfo, token});
    },
    getFavorite : (token) => {
        return axios.post('/favorite', token);
    },
    addToFav : (songInfo, token) => {
        return axios.post('/favorite/song', songInfo, token);
    },
    delFromFav : (id, token) => {
        return axios.delete('/favorite/song', id, token);
    },
    createPlaylist : (plName, token) => {
        return axios.post('/createPlaylist', plName, token);
    },
    getPlaylist : (plName, token) => {
        return axios.post('/playlist', plName, token);
    },
    deletePlaylist : (id, token) => {
        return axios.delete('/playlist', id, token);
    },
    addToPlaylist : (plID, songInfo, token) => {
        return axios.post('/playlist/song', {plID, songInfo}, token);
    },
    deleteFromPlaylist : (plID, songID, token) => {
        return axios.delete('/playlist/song', {plID, songID}, token);
    }
};