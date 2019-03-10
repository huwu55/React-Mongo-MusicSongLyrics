import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";

import index from "./pages/index";
import Home from "./pages/Home";


export default () => {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/" component={index} />
                    <Route exact path="/login" component={index} />
                    <Route exact path="/signup" component={index} />
                    <Route exact path="/logout" component={index} />
                    <Route exact path="/home" component={Home} />
                    {/* <Route component={NoMatch} /> */}
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}