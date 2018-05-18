import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { verify } from "../redux/auth";

import "./style.css";

import Header from "./Header.js";
import Nav from "./Nav.js";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import Rules from "./Rules"
import Home from "./Home";
import Game from "./Game";
import Footer from "./Footer.js";
import Profile from "./Profile";

import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
    componentDidMount() {
        this.props.verify();
    }
    render() {
        const { isAuthenticated, loading } = this.props;
        return (
            <div className="app-wrapper">
                <Header />
                <Nav />
                {
                    loading ?
                        <div>...Loading</div>
                        :
                        <Switch>
                            <Route exact path="/" render={props => isAuthenticated ? <Redirect to="/home" /> : <Landing {...props} />} />

                            <Route path="/signup" render={props => isAuthenticated ? <Redirect to="/home" /> : <Signup {...props} />} />

                            <Route path="/login" render={props => isAuthenticated ? <Redirect to="/home" /> : <Login {...props} />} />

                            <Route path="/rules" component={Rules}/>

                            <ProtectedRoute path="/home" component={Home} />

                            <ProtectedRoute path="/profile" component={Profile} />

                            <ProtectedRoute path="/game" component={Game} /> } />
                            {/* <Route path="/game" component={Game} /> */}
                        </Switch>
                }
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(state => state.user, { verify })(App));
