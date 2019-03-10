import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";

import Intro from "./Intro";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";

export default () => {
    return (
        <Router>
            <div className="index">
                <Navbar />
                <Route exact path="/" component={Intro} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/logout" component={Logout} />
            </div>
        </Router>
    );
}