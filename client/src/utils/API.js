import axios from "axios";
export default {
    signup : function(user){
        return axios.post('/signup', user);
    },
    login : (user) => {
        return axios.post('/login', user);
    },
    searchSong : (songInfo, token) => {
        // console.log(songInfo);
        // console.log(token);
        // console.log({songInfo, token});
        return axios.post("/search", {songInfo, token});
    },
    getFavorite : (username, token) => {
        return axios.post('/favorite', {username, token});
    },
    addToFav : (username, songInfo, token) => {
        return axios.post('/favorite/song', {username, songInfo, token});
    },
    delFromFav : (username, id, token) => {
        return axios.delete('/favorite/song', {data: {username, id, token}});
    }
    // createPlaylist : (plName, token) => {
    //     return axios.post('/createPlaylist', plName, token);
    // },
    // getPlaylist : (plName, token) => {
    //     return axios.post('/playlist', plName, token);
    // },
    // deletePlaylist : (id, token) => {
    //     return axios.delete('/playlist', id, token);
    // },
    // addToPlaylist : (plID, songInfo, token) => {
    //     return axios.post('/playlist/song', {plID, songInfo}, token);
    // },
    // deleteFromPlaylist : (plID, songID, token) => {
    //     return axios.delete('/playlist/song', {plID, songID}, token);
    // }
};