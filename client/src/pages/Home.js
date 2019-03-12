import React from "react";
import Navbar from "../components/Navbar-logedin";
import Video from "../components/Video";
import PlaylistBar from "../components/PlaylistBar";
import Playlist from "../components/Playlist";


class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            songs : [
                {
                    video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                    lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                }
            ],
            playlists : [
                {
                    _id:"sdofnwonfncoiswfe",
                    name: "Favorites",
                    songs: [
                        {   _id: "sofowenfwoef",
                            artist: "Adele",
                            name: "Someone Like you",
                            thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                            video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                            lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                        },
                        {
                            _id:"sojfisjf",
                            artist: "Adele",
                            name: "Someone Like you",
                            thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                            video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                            lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                        },
                        {
                            _id:"sofnonsconc",
                            artist: "Adele",
                            name: "Someone Like you",
                            thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                            video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                            lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                        },
                        {
                            _id:"sojfsijiisis",
                            artist: "Adele",
                            name: "Someone Like you",
                            thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                            video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                            lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                        },
                        {
                            _id:"sojfsijiisisw",
                            artist: "Adele",
                            name: "Someone Like you",
                            thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                            video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                            lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                        },
                        {
                            _id:"sojfsijiisisa",
                            artist: "Adele",
                            name: "Someone Like you",
                            thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                            video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                            lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                        },
                        {
                            _id:"sojfsijiisisr",
                            artist: "Adele",
                            name: "Someone Like you",
                            thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
                            video: "https://www.youtube.com/embed/hLQl3WQQoQ0",
                            lyrics: "I heard that you're settled down\nThat you found a girl and you're married now\nI heard that you\ndreams came true\nGuess she gave you things I didn't give to you\n\nOld friend, why are you so shy?\nAin't like you to hold back or hide from the light\nI hate to turn up out of the blue uninvited\nBut I couldn't stay away, I couldn't fight it\n\nI had hoped you'd see my face\nAnd that you'd be reminded definitely\nThat for me it isn't over"
                        }
                    ]
                }
            ]
        };
    }

    // componentDidMount(){

    // }

    render() {
        return (
            <div>
                <Navbar logout={this.props.logout} />
                <div className="container">
                    <Video video={this.state.songs[0].video} lyrics={this.state.songs[0].lyrics} />
                    <div className="row collections">
                        <PlaylistBar />
                        <Playlist songs={this.state.playlists[0].songs} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;