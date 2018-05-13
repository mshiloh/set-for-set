import React from "react";
import { Link } from "react-router-dom"

import { connect } from "react-redux";
import { logout } from "../redux/auth";



function Nav(props) {
    const isAuthenticated = props.isAuthenticated;
    return (
        <div className="nav-wrapper">
            <nav>
                {isAuthenticated ? null : <div className="nav-link"><Link to="/"></Link></div>}

                {isAuthenticated ? null : <div className="nav-link"><Link to="/signup">Sign Up</Link></div>}

                {isAuthenticated ? null : <div className="nav-link"><Link to="/login">Log In</Link></div>}

                {isAuthenticated ? null : <div className="nav-link"><Link to="/rules">How to Play</Link></div>}

                {isAuthenticated ? <div className="nav-link"><Link to="/home">Home</Link></div> : null}

                {isAuthenticated ? <div className="nav-link"><Link to="/game">Game</Link></div> : null}

                {isAuthenticated ? <div className="nav-link"><button onClick={props.logout}>Log Out</button></div> : null}
            </nav>
        </div>
    )
}

export default connect(state => state.user, {logout})(Nav);  