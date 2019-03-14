import React from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
/*
class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            loggedIn : false
        };
    }

    render (){
        return (
            <div>
                <h1 className="title">Log In</h1>
                <LoginForm />
            </div>
        );
    }
}

export default Login;
*/


export default (prop)=>{
    if (prop.logged_in === true) {
        return <Redirect to='/home' />
    }

    localStorage.removeItem('token');

    return (
        <div className="index">
            <Navbar />
            <div>
                <h1 className="title">Log In</h1>
                <LoginForm login={prop.login} />
            </div>
        </div>
    );
}