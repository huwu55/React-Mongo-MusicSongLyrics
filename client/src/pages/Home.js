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
            username : props.username,
            song : {
                //         artist: "Adele",
                //         name: "Someone Like you",
                //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
            },
            playlist : 
                {
                    // _id:"sdofnwonfncoiswfe",
                    // name: "Favorites",
                    // songs: [
                    //     {   _id: "sofowenfwoef",
                    //         artist: "Adele",
                    //         name: "Someone Like you",
                    //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                    //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                    //     },
                    //     {
                    //         _id:"sojfisjf",
                    //         artist: "Adele",
                    //         name: "Someone Like you",
                    //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                    //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                    //     },
                    //     {
                    //         _id:"sofnonsconc",
                    //         artist: "Adele",
                    //         name: "Someone Like you",
                    //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                    //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                    //     },
                    //     {
                    //         _id:"sojfsijiisis",
                    //         artist: "Adele",
                    //         name: "Someone Like you",
                    //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                    //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                    //     },
                    //     {
                    //         _id:"sojfsijiisisw",
                    //         artist: "Adele",
                    //         name: "Someone Like you",
                    //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                    //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                    //     },
                    //     {
                    //         _id:"sojfsijiisisa",
                    //         artist: "Adele",
                    //         name: "Someone Like you",
                    //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                    //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                    //     },
                    //     {
                    //         _id:"sojfsijiisisr",
                    //         artist: "Adele",
                    //         name: "Someone Like you",
                    //         thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                    //         video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    //         lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                    //     }
                    // ]
            }
        };
    }
    

    // componentDidMount(){

    // }
    
    getToken = () => {
        return localStorage.getItem('token');
    }

    search = (event)=>{
        event.preventDefault();

        let inputs = event.target.children;

        let artist = inputs[0].value.trim();
        let songName = inputs[1].value.trim();

        if (artist == "" || songName == "") return alert("Must enter both artist and song name.");

        return API.searchSong({artist, songName}, this.getToken())
            .then(res => {
                console.log(res.data);
                this.setState({song: res.data});
            })
            .catch(err => {
                console.log(err);
                alert("No lyrics record");
                //alert(err.response.data.error);
            });
    }

    render() {
        if(!this.props.logged_in) return <Redirect to='/login' />
        
        return (
            <div>
                <Navbar username={this.state.username} logout={this.props.logout} search={this.search} />
                <div className="container">
                    {/* <Video video={this.state.song.video} lyrics={this.state.song.lyrics} /> */}
                    <Video song={this.state.song} />
                    <div className="row collections">
                        <PlaylistBar />
                        <Playlist songs={this.state.playlist.songs} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;