import React from "react";
import Navbar from "../components/Navbar";
import { Redirect } from 'react-router-dom';



export default (props) => {
    if (props.demoAccount) {
        return <Redirect to='/home' />
    }

    localStorage.removeItem('token');

    return (
        <div className="index">
            <Navbar />
            <div className="intro">
                <h1 className="title">Music, Song, &amp; Lyrics</h1>
                <div id='demologin'>
                    <a href='#' onClick={()=>props.logIntoDemo()}> 
                        Want to try out the app without sign up/log in? <br></br>
                        Click here to the demo account
                    </a>
                </div> 
                <p>Pair artist and song to retrieve music lyrics and a video for you to sing along</p>
                <p>Log in/Sign up to add your favorite songs</p>
            </div>
        </div>
    );
}