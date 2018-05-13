import React, { Component } from 'react';
import LoginForm from "./LoginForm";

import { connect } from "react-redux";
import { login } from "../../redux/auth";

import "./style.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                email: "",
                password: ""
            }
        }
    }

    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    clearInputs() {
        this.setState({
            inputs: {
                email: "",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.inputs);
        this.clearInputs();
    }

    render() {
        const authErrorCode = this.props.authErrCode;
        let errMsg = "";
        if (authErrorCode < 500 && authErrorCode > 399) {
            errMsg = "Invalid email and/or password."
        } else if (authErrorCode > 499) {
            errMsg = "Server error!"
        }
        return (
            <LoginForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                errMsg={errMsg}
                {...this.state.inputs} />
        )
    }
}

export default connect(state => state.user, { login })(Login);