import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";

import Intro from "./pages/Intro";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Users from './pages/Users';
import Songs from './pages/Songs';
import CheckIns from './pages/CheckIns';

import API from "./utils/API";
import "./components/style.css";
import "./components/grid.css";


class App extends React.Component {
    constructor(){
        super();

        this.state = {
            signed_up : false,
            logged_in : false,
            demoAccount : false
        };
    }

    signup = (event) => {
        event.preventDefault();

        let inputs = event.target.children;
        let username = inputs[0].value.trim();
        let password = inputs[1].value;
        let passwordConf = inputs[2].value;

        if(username === "") return alert("You need a username.");
        else if(password === "") return alert("You need a password.");
        else if (password === passwordConf){
            if(password.length <= 5) return alert('Password length must be greater than 5.');

            else return API.signup({username, password})
                .then((res) => {
                    alert(res.message);
                    this.setState({signed_up: true});
                })
                .catch(err => {
                    if (err.response)   alert(err.response.error);
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
                if (res.token){
                    this.setState({logged_in: true}, function(){
                      localStorage.setItem('token', res.token);
                    });
                }
                else{
                    alert(res.error);
                }
            })
            .catch(err=>{
                if (err.response)   alert(err.response.error);
            });
    }

    logout = (event) => {        
        this.setState({logged_in: false, signed_up: false, demoAccount: false}, function(){
            localStorage.removeItem('token');
        });
    }

    logIntoDemo = ()=>{
        return API.login({username:'demo', password:'demoaccount'})
            .then(res=>{
                if (res.token){
                    this.setState({logged_in: true, signed_up: true, demoAccount: true}, function(){
                      localStorage.setItem('token', res.token);
                    });
                }
                else{
                    alert(res.error);
                }
            })
            .catch(err=>{
                if (err.response)   alert(err.response.error);
            });
    }

    render(){
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/" render={()=> <Intro logIntoDemo={this.logIntoDemo} demoAccount={this.state.demoAccount} /> } />
                        <Route exact path="/signup" render={()=> <Signup signed_up={this.state.signed_up} signup={this.signup} logIntoDemo={this.logIntoDemo} /> } />
                        <Route exact path="/login" render={()=> <Login logged_in={this.state.logged_in} login={this.login} logIntoDemo={this.logIntoDemo} /> } />
                        <Route exact path="/logout" component={Logout} />
                        <Route path="/home" render={()=> <Home logout={this.logout} />} />
                        <Route exact path="/users" render={()=> <Users />} />
                        <Route exact path="/songs" render={()=> <Songs />}/>
                        <Route exact path='/checkIns' render={() => <CheckIns />} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;