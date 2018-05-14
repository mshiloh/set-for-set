import React from "react";
import { Link } from "react-router-dom";

function SignupForm(props) {
    return (
        <div className="signup-form-wrapper">
            <form className="signup-form-container" onSubmit={props.handleSubmit}>
                <h3 className="signup-head">Sign Up</h3>
                <input className="signup-form-input" onChange={props.handleChange}
                    value={props.name}
                    name="name"
                    type="text"
                    placeholder="Name" />

                <input className="signup-form-input" onChange={props.handleChange}
                    value={props.email}
                    name="email"
                    type="text"
                    placeholder="Email" />

                <input className="signup-form-input" onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password" />

                <button className="signup-butt" type="submit">Create Account</button>

                <p className="already-account">Already have an account? </p>

                <p className="signup-login" >                    
                    <Link to="/login">Login</Link>
                </p>

                {props.errMsg && <p>{props.errMsg}</p>}

            </form>

        </div>
    )
}

export default SignupForm