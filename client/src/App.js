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
            logged_in : false,
            username: ""
        };
    }
    
    // getToken = () => {
    //     return localStorage.getItem('token');
    // }

    signup = (event) => {
        event.preventDefault();

        let inputs = event.target.children;
        // console.log(inputs);
        let username = inputs[0].value.trim();
        let password = inputs[1].value.trim();
        let passwordConf = inputs[2].value.trim();
        // console.log(username, password);
        if(username === "") alert("You need a username.");
        else if (password == passwordConf){
            return API.signup({username, password})
                .then((res) => {
                    alert("Successfully signed up!");
                    this.setState({signed_up: true});
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
    
    login = (event)=>{
        event.preventDefault();

        let inputs = event.target.children;

        let username = inputs[0].value;
        let password = inputs[1].value;

        return API.login({username, password})
            .then(res=>{
                // console.log(res.data.token);
                if (res.data.token){
                    this.setState({logged_in: true, username}, function(){
                      localStorage.setItem('token', res.data.token);
                    //   localStorage.setItem('user', username);
                    });

                    //API.home()
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
        // event.preventDefault();
        
        this.setState({logged_in: false}, function(){
            localStorage.removeItem('token');
            // localStorage.removeItem('user');
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
                        <Route exact path="/home" render={()=> <Home logged_in={this.state.logged_in} username={this.state.username} logout={this.logout} />} />
                        {/* <Route component={NoMatch} /> */}
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;