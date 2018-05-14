import React from "react";
import { Link } from "react-router-dom";

function LoginForm(props) {
    return (
        <div className="login-form-wrapper">
            <form className="login-form-container" onSubmit={props.handleSubmit}>

                <h3 className="login-head">Log In</h3>

                <input className="login-form-input"
                    onChange={props.handleChange}
                    value={props.email}
                    name="email"
                    type="text"
                    placeholder="Email" />

                <input className="login-form-input"
                    onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password" />

                <button className="login-butt" type="submit">Log In</button>

                <p className="no-account">Don't have an account? </p>

                <p className="login-signup" >
                    <Link to="/signup">Sign Up</Link>
                </p>

                {props.errMsg && <p>{props.errMsg}</p>}

            </form>
        </div>
    )
}

export default LoginForm;