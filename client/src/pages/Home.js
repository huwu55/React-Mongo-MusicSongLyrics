import React from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar-logedin";
import Video from "../components/Video";
import PlaylistBar from "../components/PlaylistBar";
import Playlist from "../components/Playlist";
import API from "../utils/API";


class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username : this.props.username,//localStorage.getItem('user'),
            song : {},
            favorites : []
        };
    }
    
    getToken = () => {
        return localStorage.getItem('token');
    }

    componentDidMount(){
        API.getFavorite(this.state.username, this.getToken())
            .then((response, error)=>{
                if(error)   return alert("Something is wrong, try again");
                let song = response.data.favorites[0];
                if(song){
                    song = {
                        artist: song.artist,
                        name: song.name,
                        thumbnail: song.thumbnail,
                        video: song.video,
                        lyrics: song.lyrics
                    };
                    // console.log(song);
                }
                else song = {};
                this.setState({
                    username: response.data.name,
                    song,
                    favorites: [...response.data.favorites]
                });
            })
            .catch(error=>{
                // if(error.response.status == 403) alert("Invalid user token, please log in");
                alert("Something is wrong, try again");
            });
    }

    search = (event)=>{
        event.preventDefault();

        let inputs = event.target.children;

        let artist = inputs[0].value.trim();
        let songName = inputs[1].value.trim();

        if (artist == "" || songName == "") return alert("Must enter both artist and song name.");

        return API.searchSong({artist, songName}, this.getToken())
            .then((res) => {
                this.setState({song: res.data});
            })
            .catch(error=>{
                // console.log("error is here", error.response.status);
                if(error.response.status == 403) alert("Invalid user token, please log in");
                else alert("No lyrics found.");
            });
    }

    addToFav = () => {
        if (!this.state.song.name)  return alert("Search a song first");

        return API.addToFav(this.state.username, this.state.song, this.getToken())
            .then((response, error)=>{
                //console.log(response.data);
                // if(error)   return alert("Something is wrong, try again");
                this.setState({
                    // username: response.data.name,
                    favorites: [...response.data.favorites]
                });
            })
            .catch(error=>{
                if(error.response.status == 403) alert("Invalid user token, please log in");
                else alert("Something is wrong, try again");
            });
    }

    playThis = (song) =>{
        // console.log(song);
        this.setState({song});
    }

    deleteSong = (songid) => {
        // console.log(songid);
        return API.delFromFav(this.state.username, songid, this.getToken())
            .then(response => {
                // console.log(response.data);
                this.setState({
                    // username: response.data.name,
                    favorites: [...response.data.favorites]
                });
            })
            .catch(error => {
                if(error.response.status == 403) alert("Invalid user token, please log in");
                else alert("Something is wrong, try again");
            });
    }

    render() {
        if(!this.getToken()) return <Redirect to='/login' />
        if(this.state.username == "") return <Redirect to='/login' />
        // if(this.state.favorites.length === 0)   return <Welcome username={this.state.username} />

        return (
            <div>
                <Navbar username={this.state.username} logout={this.props.logout} search={this.search} />

                <div className="container">
                    {/* <Video video={this.state.song.video} lyrics={this.state.song.lyrics} /> */}
                    <Video song={this.state.song} addToFav={this.addToFav} />
                    <div className="row collections">
                        {/* <PlaylistBar /> */}
                        {this.state.favorites.length == 0 &&
                            <div className="index intro col-12">
                                <p>Looks like you don't have any favorite songs yet!</p>
                                <p>Search artist and song name to get started</p>
                            </div>
                        }
                        {this.state.favorites.length > 0 &&
                            <Playlist playThis={this.playThis} deleteSong={this.deleteSong} songs={this.state.favorites} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;