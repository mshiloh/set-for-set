import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../redux/auth";



function Nav(props) {
    const isAuthenticated = props.isAuthenticated;
    return (
        <div className="nav-wrapper">
            <nav>
                {isAuthenticated ? "" : <div className="nav-link"><Link to="/"></Link></div>}

                {isAuthenticated ? "" : <div className="nav-link"><Link to="/signup">Sign Up</Link></div>}

                {isAuthenticated ? "" : <div className="nav-link"><Link to="/login">Log In</Link></div>}


                {isAuthenticated ? <div className="nav-link"><Link to="/home">Home</Link></div> : ""}

                {isAuthenticated ? <div className="nav-link"><Link to="/game">Game</Link></div> : ""}

                <div className="nav-link"><Link to="/rules/">How to Play</Link></div>
                {isAuthenticated ? <div className="nav-link logout"><Link to="/login"  onClick={props.logout} >Log Out</Link></div> : ""}
            </nav>
        </div>
    )
}

export default connect(state => state.user, { logout })(Nav);  