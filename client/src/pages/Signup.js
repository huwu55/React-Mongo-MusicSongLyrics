import React from "react";
import { Redirect } from 'react-router-dom';
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
// import API from "../utils/API";

/*
class Signup extends React.Component {
    constructor(){
        super();
        this.state = {
            signedup : false
        };
    }

    signup = (event) => {
        event.preventDefault();

        let inputs = event.target.children;
        // console.log(inputs);
        let username = inputs[0].value;
        let password = inputs[1].value;
        let passwordConf = inputs[2].value;
        // console.log(username, password);
        if (password == passwordConf){
            return API.signup({username, password})
                .then((res) => {
                    // alert(`${res.data.message} Please return to the`);
                    this.setState({signedup: true});
                })
                .catch(err => {
                    // console.log("error", err.response);
                    if (err.response)   alert(err.response.data.error);
                });
        }
        else{
            alert('your password and password confirmation have to match!');
        }
    }
    
    render (){
        if (this.state.signedup === true) {
            return <Redirect to='/login' />
        }

        return (
            <div>
                <h1 className="title">Sign Up</h1>
                <SignupForm signup={this.signup} />
            </div>
        );
    }
}

export default Signup;
*/

export default (prop)=>{
    if (prop.signed_up === true) {
        return <Redirect to='/login' />
    }

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

