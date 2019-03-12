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
    home : () => {
        return axios.post('/home');
    },
    searchSong : (songInfo) => {
        return axios.post("/search", songInfo);
    },
    getFavorite : () => {
        return axios.post('/favorite');
    },
    addToFav : (songInfo) => {
        return axios.post('/favorite/song', songInfo);
    },
    delFromFav : (id) => {
        return axios.delete('/favorite/song', id);
    },
    createPlaylist : (plName) => {
        return axios.post('/createPlaylist', plName);
    },
    getPlaylist : (plName) => {
        return axios.post('/playlist', plName);
    },
    deletePlaylist : (id) => {
        return axios.delete('/playlist', id);
    },
    addToPlaylist : (plID, songInfo) => {
        return axios.post('/playlist/song', {plID, songInfo});
    },
    deleteFromPlaylist : (plID, songID) => {
        return axios.delete('/playlist/song', {plID, songID});
    }
};