import React, { Component } from 'react';
import SignupForm from "./SignupForm";

import { connect } from "react-redux";
import { signup } from "../../redux/auth";

import "./style.css";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                name: "",
                email: "",
                password: ""
            }
        }
    }

    handleChange(e) {
        e.persist();
        this.setState(prevState => {
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
                name: "",
                email: "",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state.inputs);
        this.clearInputs();
    }

    render() {
        const authErrorCode = this.props.authErrCode;
        let errMsg = '';
        if (authErrorCode < 500 && authErrorCode > 399) {
            errMsg = "Email already in use. Please sign up with a new email, or log in with your existing one."
        } else if (authErrorCode > 499) {
            errMsg = "Server error!"
        }
        // console.log(this.props);
        return (
            <SignupForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                errMsg={errMsg}
                {...this.state.inputs} />
        )
    }
}

// const mapStateToProps = state => state

export default connect(state => state.user, { signup })(Signup);
