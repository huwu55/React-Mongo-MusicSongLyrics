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
            username : this.props.username,
            song : {},
            favorites : [],
            playlists : [],
            isPlaylist: false,
            selectedPlaylist :{
                name: "",
                songs:[]
            }
        };
    }
    
    getToken = () => {
        // console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
    }

    componentDidMount(){

        API.userInfo(this.getToken())
            .then(res=>{
                //console.log(res.data);
                let userInfo = res.data;
                this.setState({
                    username:   userInfo.name,
                    favorites: [...userInfo.favorites],
                    playlists: [...userInfo.playlists]
                });
            })
            .catch(err=>{
                console.log(err);
            })

    }

    search = (event)=>{
        event.preventDefault();

        let inputs = event.target.children;

        let artist = inputs[0].value.trim();
        let songName = inputs[1].value.trim();

        if (artist === "" || songName === "") return alert("Must enter both artist and song name.");

        return API.searchSong({artist, songName}, this.getToken())
            .then((res) => {
                this.setState({song: res.data});
            })
            .catch(error=>{
                // console.log("error is here", error.response.status);
                if(error.response.status === 403) alert("Invalid user token, please log in");
                else alert("No lyrics found.");
            });
    }

    addToFav = () => {
        if (!this.state.song.name)  return alert("Search a song first");

        return API.addToFav(this.state.song, this.getToken())
            .then((response, error)=>{
                //console.log(response.data);
                // if(error)   return alert("Something is wrong, try again");
                this.setState({
                    // username: response.data.name,
                    favorites: [...response.data.favorites],
                });
                if (this.state.selectedPlaylist.name === "Favorite")
                    this.setState({
                        selectedPlaylist : {
                            name: "Favorite",
                            songs: response.data.favorites
                        }
                    });
            })
            .catch(error=>{
                if(error.response.status === 403) alert("Invalid user token, please log in");
                else alert("add-to-fav: Please log in");
            });
    }

    playThis = (song) =>{
        // console.log(song);
        this.setState({song});
    }

    deleteSong = (songid) => {
        // console.log(songid);
        let plName = this.state.selectedPlaylist.name;

        if (this.state.selectedPlaylist.name === "Favorite")
            return API.delFromFav(songid, this.getToken())
                .then(response => {
                    // console.log(response.data);
                    this.setState({
                        // username: response.data.name,
                        favorites: [...response.data.favorites],
                        selectedPlaylist : {
                            name: "Favorite",
                            songs: response.data.favorites
                        }
                    });
                })
                .catch(error => {
                    if(error.response.status === 403) alert("Invalid user token, please log in");
                    else alert("delete-song-from-fav: Please log in");
                });
        else return API.deleteFromPlaylist(this.state.selectedPlaylist.name, songid, this.getToken())
                .then(res=>{
                    console.log(res.data);
                    this.setState({
                        selectedPlaylist: {
                            name: plName,
                            songs: res.data.songs
                        }
                    });
                })
                .catch(err=>{
                    if(err.response.status === 403) alert("Invalid user token, please log in");
                    else alert("delete-song: Please log in");
                });
    }

    isPlaylist = (e) => {
        let selectedPlaylist = e.target.value;
        console.log(selectedPlaylist);
        if (selectedPlaylist === "None"|| selectedPlaylist==="Favorite"){
            // alert(selectedPlaylist);
            this.setState({isPlaylist: false});
            if(selectedPlaylist==="Favorite"){
                this.setState({
                    selectedPlaylist: {
                        name: "Favorite",
                        songs: [...this.state.favorites]
                    }
                });
            }
            else this.setState({selectedPlaylist: {
                name: "",
                songs:[]
            }});
        } 
        else{
            //alert(selectedPlaylist);
            //this.setState({selectedPlaylist:[]});
            API.getPlaylist(selectedPlaylist, this.getToken())
                .then(res=>{
                    //console.log(res.data[0].songs);
                    this.setState({
                        isPlaylist: true,
                        selectedPlaylist: {
                            name: selectedPlaylist,
                            songs: res.data[0].songs
                        }
                    });
                })
                .catch(err=>{
                    if(err.response.status === 403) alert("Invalid user token, please log in");
                    else alert("select playlist: Please log in");
                })
            //this.setState({isPlaylist: true});
        }
    }

    createNewPlaylist = event => {
        event.preventDefault();

        let playlistName = event.target.children[0].value.trim();
        // console.log(playlistName);

        API.createPlaylist(playlistName, this.getToken())
            .then(res=>{
                //console.log(res.data);
                alert("Playlist created: "+playlistName);
                this.setState({
                    playlists: res.data.playlists
                });
            })
            .catch(err=>{
                console.log("create new playlist error: ", err);
            });
    }

    addToPlaylist = (pid, pName) =>{
        //alert(pid + pName);
        if (!this.state.song.name)  return alert("Search a song first");

        return API.addToPlaylist(pid, this.state.song, this.getToken())
            .then((response)=>{

                if (this.state.selectedPlaylist.name === pid)
                    this.setState({
                        selectedPlaylist:{
                            name: pid,
                            songs: response.data.songs
                        }
                    });
            })
            .catch(error=>{
                if(error.response.status === 403) alert("Invalid user token, please log in");
                else alert("add-to-playlist: Please log in");
            });
    }

    deletePlaylist = () =>{
        //console.log(this.state.selectedPlaylist.name);
        API.deletePlaylist(this.state.selectedPlaylist.name, this.getToken())
            .then(res=>{
                console.log(res.data);
                this.setState({
                    playlists: res.data.playlists,
                    isPlaylist: false,
                    selectedPlaylist : {
                        name: "",
                        songs: []
                    }
                });
            })
            .catch(err=>{
                console.log(err);
            });
    }

    render() {
        if(!this.getToken()) return <Redirect to='/login' />

        return (
            <div>
                <Navbar username={this.state.username} logout={this.props.logout} search={this.search} />

                <div className="container">
                    <Video 
                        song={this.state.song} 
                        addToFav={this.addToFav} 
                        playlists={this.state.playlists}
                        addToPlaylist={this.addToPlaylist}
                    />
                    <div className="row collections">
                        <PlaylistBar 
                            selectPl={this.isPlaylist}
                            isPlaylist={this.state.isPlaylist}
                            createNewPlaylist={this.createNewPlaylist}
                            playlists={this.state.playlists}
                            deletePlaylist={this.deletePlaylist}
                        />
                        {(this.state.selectedPlaylist.songs.length === 0 || this.state.selectedPlaylist.songs === undefined) &&
                            <div className="index intro col-12">
                                <p>Looks like you don't have any song yet!</p>
                                <p>Search a song and add it to Favorites or playlists</p>
                            </div>
                        }
                        {this.state.selectedPlaylist.songs.length > 0 &&
                            <Playlist playThis={this.playThis} deleteSong={this.deleteSong} songs={this.state.selectedPlaylist.songs} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;