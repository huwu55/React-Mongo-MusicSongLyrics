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
            username : "",
            song : {},
            favorites : [],
            playlists : [],
            isPlaylist: false,
            selectedPlaylist :{
                name: "",
                songs:[]
            },
            searching : false
        };
    }
    
    getToken = () => {
        return localStorage.getItem('token');
    }

    componentDidMount(){
        //console.log(window.location.href);
        API.userInfo(this.getToken())
            .then(res=>{
                if(res.error)
                    return alert(res.error);
                    
                let userInfo = {
                    username: res.name,
                    song: res.favorites[res.favorites.length-1],
                    favorites: [...res.favorites],
                    playlists: [...res.playlists],
                    isPlaylist: false,
                    selectedPlaylist: {
                        name: "Favorite",
                        songs: [...res.favorites]
                    }
                };

                if(res.favorites.length === 0)
                    userInfo.song = {};

                //console.log(userInfo);

                this.setState(userInfo);
            })
            .catch(err=>{
                console.log(err);
                //if(err.response) console.log(err.response.error);
            });

    }

    search = (event)=>{
        event.preventDefault();
        let inputs = event.target.children;

        let artist = inputs[0].value.trim();
        let songName = inputs[1].value.trim();

        if (artist === "" || songName === "") return alert("Must enter both artist and song name.");
        // console.log(artist, songName);
        this.setState({searching: true});
        return API.searchSong({artist, songName}, this.getToken())
            .then((res) => {
                //console.log(res);
                if(res.error){
                    this.setState({searching: false});

                    return alert(res.error);
                }

                this.setState({song: res, searching: false});
            })
            .catch(error=>{
                this.setState({searching: false});
                console.log(error);
                //alert(error.response.error);
            });
    }

    addToFav = () => {
        if (!this.state.song.name)  return alert("Search a song first");
        return API.addToFav(this.state.song, this.getToken())
            .then((response)=>{
                if(response.error)
                    return alert(response.error);

                let favorites = [...this.state.favorites];

                let hasSong = false;
                for(let i = 0; i < favorites.length; i++){
                    if(favorites[i]._id === response.message){
                        hasSong = true;
                        break;
                    }
                }

                if(!hasSong){
                    favorites.push({...this.state.song, _id: response.message});
                }

                this.setState({
                    favorites,
                });
                if (this.state.selectedPlaylist.name === "Favorite")
                    this.setState({
                        selectedPlaylist : {
                            name: "Favorite",
                            songs: favorites
                        }
                    });
            })
            .catch(error=>{
                //alert(error.response.error);
                console.log(error);
            });
    }

    playThis = (song) =>{
        this.setState({song}, ()=>{
            document.textInput.focus();
        });
    }

    deleteSong = (songid) => {
        let plName = this.state.selectedPlaylist.name;
        if (this.state.selectedPlaylist.name === "Favorite"){
            let favorites = [...this.state.favorites];
            for(let i = 0; i < favorites.length; i++){
                if(favorites[i]._id === songid){
                    favorites.splice(i, 1);
                    break;
                }
            }
            
            this.setState({
                favorites: favorites,
                selectedPlaylist : {
                    name: "Favorite",
                    songs: favorites
                }
            });

            API.delFromFav(songid, this.getToken())
                .then(response => {
                    if(response.error)
                        return alert(response.error);
                })
                .catch(error => {
                    //alert(error.response.error);
                    console.log(error);
                });
        }
        else{
            let selected = [...this.state.selectedPlaylist.songs];
            for(let i = 0; i < selected.length; i++){
                if(selected[i]._id === songid){
                    selected.splice(i, 1);
                    break;
                }
            }

            this.setState({
                selectedPlaylist: {
                    name: plName,
                    songs: selected
                }
            });

            API.deleteFromPlaylist(this.state.selectedPlaylist.name, songid, this.getToken())
                .then(res=>{
                    if(res.error)
                        return alert(res.error);
                })
                .catch(err=>{
                    //alert(err.response.error);
                    console.log(err);
                });
        }
    }

    isPlaylist = (e) => {
        let selectedPlaylist = e.target.value;
        //console.log(selectedPlaylist);
        if (selectedPlaylist === "None"|| selectedPlaylist==="Favorite"){
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
            API.getPlaylist(selectedPlaylist, this.getToken())
                .then(res=>{
                    if(res.error)
                        return alert(res.error);

                    this.setState({
                        isPlaylist: true,
                        selectedPlaylist: {
                            name: selectedPlaylist,
                            songs: res[0].songs
                        }
                    });
                })
                .catch(err=>{
                    //alert(err.response.error);
                    console.log(err);
                });
        }
    }

    createNewPlaylist = event => {
        event.preventDefault();

        let playlistName = event.target.children[0].value.trim();
        let created = false;

        for(let i = 0; i < this.state.playlists.length; i++){
            if(this.state.playlists[i].name === playlistName)
                created = true;
        }

        if(!created || (created && window.confirm("Playlist name exists, do you want to continue creating this playlist?"))){
            API.createPlaylist(playlistName, this.getToken())
                .then(res=>{
                    if(res.error)
                        return alert(res.error);
                    let playlists = [...this.state.playlists];
                    playlists.push(res);
                    alert("Playlist created: "+playlistName);
                    this.setState({
                        playlists
                    });
                })
                .catch(err=>{
                    //alert(err.response.error);
                    console.log(err);
                });
        }
    }

    addToPlaylist = (pid, song) =>{
        if (!this.state.song.name)  return alert("Search a song first");
        // console.log(song);

        return API.addToPlaylist(pid, song, this.getToken())
            .then((response)=>{
                if(response.error)
                    return alert(response.error);

                if (this.state.selectedPlaylist.name === pid){
                    let selected = [...this.state.selectedPlaylist.songs];
                    let hasSong = false;

                    for(let i = 0; i < selected.length; i++){
                        if(selected[i]._id === response.message){
                            hasSong = true;
                            break;
                        }
                    }

                    if(!hasSong){
                        if(song._id)
                            selected.push(song);
                        else
                            selected.push({...song, _id: response.message});
                    }

                    this.setState({
                        selectedPlaylist:{
                            name: pid,
                            songs: selected
                        }
                    });
                }
            })
            .catch(error=>{
                //alert(error.response.error);
                console.log(error);
            });
    }

    deletePlaylist = () =>{
        API.deletePlaylist(this.state.selectedPlaylist.name, this.getToken())
            .then(res=>{
                if(res.error)
                    return alert(res.error);

                this.setState({
                    playlists: res.playlists,
                    isPlaylist: false,
                    selectedPlaylist : {
                        name: "",
                        songs: []
                    }
                });
            })
            .catch(err=>{
                //alert(err.response.error);
                console.log(err);
            });
    }

    render() {
        if(!this.getToken()) return <Redirect to='/login' />

        return (
            <div>
                <span id="anchor-video"></span>
                <Navbar username={this.state.username} logout={this.props.logout} search={this.search} searching={this.state.searching}/>

                <div className="home">
                    <Video 
                        song={this.state.song} 
                        addToFav={this.addToFav} 
                        playlists={this.state.playlists}
                        addToPlaylist={this.addToPlaylist}
                    />
                    <div className="collections">
                        {/* <span id="anchor-pl"></span> */}
                        <PlaylistBar 
                            selectPl={this.isPlaylist}
                            isPlaylist={this.state.isPlaylist}
                            createNewPlaylist={this.createNewPlaylist}
                            playlists={this.state.playlists}
                            deletePlaylist={this.deletePlaylist}
                        />
                        {(this.state.selectedPlaylist.songs === undefined || this.state.selectedPlaylist.songs.length === 0) &&
                            <div className="index intro">
                                <p>Looks like you don't have any song yet!</p>
                                <p>Search a song and add it to Favorites or playlists</p>
                            </div>
                        }
                        {this.state.selectedPlaylist.songs.length > 0 &&
                            <Playlist 
                                playThis={this.playThis} 
                                deleteSong={this.deleteSong} 
                                songs={this.state.selectedPlaylist.songs} 
                                playlists={this.state.playlists}
                                selectedPlaylist={this.state.selectedPlaylist.name}
                                addToPlaylist={this.addToPlaylist}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;