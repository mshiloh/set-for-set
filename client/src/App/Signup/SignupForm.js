import React from "react";
import { Link } from "react-router-dom";

function SignupForm(props) {
    return (
        <div className="login-form-wrapper">
            <form className="login-form-container" onSubmit={props.handleSubmit}>
                <h3 className="login-head">Sign Up</h3>
                <input className="login-form-input" onChange={props.handleChange}
                    value={props.name}
                    name="name"
                    type="text"
                    placeholder="Name" />

                <input className="login-form-input" onChange={props.handleChange}
                    value={props.email}
                    name="email"
                    type="text"
                    placeholder="Email" />

                <input className="login-form-input" onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password" />

                <button className="login-butt" type="submit">Create Account</button>

                <p className="no-account">Already have an account? </p>

                <p className="login-signup" >                    
                    <Link to="/login">Login</Link>
                </p>

                {props.errMsg && <p>{props.errMsg}</p>}

            </form>

        </div>
    )
}

export default SignupForm