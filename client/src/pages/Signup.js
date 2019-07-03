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
                <SignupForm signup={prop.signup} />
            </div>
        </div>
    );
}

