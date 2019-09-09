import React from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";

export default (prop)=>{
    if (prop.signed_up === true) {
        return <Redirect to='/login' />
    }

    localStorage.removeItem('token');

    return (
        <div className="index">
            <Navbar />
            <div>
                <h1 className="title">Sign Up</h1>
                <div id='demologin'>
                    <a href='#' onClick={()=>prop.logIntoDemo()}> 
                        Want to try out the app without sign up/log in? <br></br>
                        Click here to the demo account
                    </a>
                </div>  
                <SignupForm signup={prop.signup} />
            </div>
        </div>
    );
}

