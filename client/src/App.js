import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";

import Intro from "./pages/Intro";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";

import API from "./utils/API";

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            signed_up : false,
            logged_in : false
        };
    }

    signup = (event) => {
        event.preventDefault();

        let inputs = event.target.children;
        // console.log(inputs);
        let username = inputs[0].value.trim();
        let password = inputs[1].value;
        let passwordConf = inputs[2].value;

        if(username === "") return alert("You need a username.");
        else if(password === "") return alert("You need a password.");
        else if (password === passwordConf){
            if(password.length <= 5) return alert('Password length must be greater than 5.');

            else return API.signup({username, password})
                .then((res) => {
                    alert(res.data.message);
                    this.setState({signed_up: true});
                })
                .catch(err => {
                    if (err.response)   alert(err.response.data.error);
                });
        }
        else{
            return alert('your password and password confirmation have to match!');
        }
    }
    
    login = (event)=>{
        event.preventDefault();

        let inputs = event.target.children;

        let username = inputs[0].value;
        let password = inputs[1].value;

        return API.login({username, password})
            .then(res=>{
                if (res.data.token){
                    this.setState({logged_in: true}, function(){
                      localStorage.setItem('token', res.data.token);
                    });
                }
                else{
                    alert('you were not logged in');
                }
            })
            .catch(err=>{
                if (err.response)   alert(err.response.data.error);
            });
    }

    logout = (event) => {        
        this.setState({logged_in: false}, function(){
            localStorage.removeItem('token');
        });
    }

    render(){
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/" component={Intro} />
                        <Route exact path="/signup" render={()=> <Signup signed_up={this.state.signed_up} signup={this.signup} /> } />
                        <Route exact path="/login" render={()=> <Login logged_in={this.state.logged_in} login={this.login} /> } />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/home" render={()=> <Home logout={this.logout} />} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;