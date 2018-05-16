import React, { Component } from 'react';
import axios from "axios";
import ProfileViewEdit from "./ProfileViewEdit.js";
import ProfilePassEdit from "./ProfilePassEdit.js";

import { connect } from "react-redux";
import { signup, editUser } from "../../redux/auth.js";

import "./style.css";

const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: props.name,
                email: props.email,
                password: "",
                avatar: props.avatar
            },
            isEditing: false,
            isEditingPass: false
        }
    }

    toggleIsEditing = (event) => {
        this.setState({ ...this.state, isEditing: !this.state.isEditing });
    }
    toggleIsEditingPass = (event) => {
        this.setState({ ...this.state, isEditingPass: !this.state.isEditingPass });
    }

    handleChange = (e) => {
        //too strict and general -> so no use of = e.persist();
        const { value, name } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        });
    }

    clearInputs() {
        this.setState(prevState => {
            return {
                ...prevState,
                inputs: {
                    name: this.props.name,
                    email: this.props.email,
                    password: "",
                    avatar: this.props.avatar
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUser(this.props._id, this.state.inputs);
        this.clearInputs();
        this.toggleIsEditing();
    }
    handleSubmitPass = (e) => {
        e.preventDefault();
        userAxios.post(`/api/users/change-password`, {password: this.state.inputs.password})
            .then(response => {})
            .catch(err => {});
        this.clearInputs();
        this.toggleIsEditingPass();
    }

    render() {
        const { isEditing, isEditingPass } = this.state;
        const authErrorCode = this.props.authErrCode;
        let errMsg = '';
        if (authErrorCode < 500 && authErrorCode > 399) {
            errMsg = "Email already in use. Please sign up with a new email, or log in with your existing one."
        } else if (authErrorCode > 499) {
            errMsg = "Server error!"
        }
        // console.log(this.props);
        //1
        if (isEditing) {
            return (
                <div className="signup-form-wrapper">
                    <ProfileViewEdit
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        errMsg={errMsg}
                        toggleIsEditing={this.toggleIsEditing}
                        {...this.state} />
                </div>
            )
        } else if (isEditingPass) {
            return (
                <div className="signup-form-wrapper">
                    <ProfilePassEdit
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmitPass}
                        errMsg={errMsg}
                        toggleIsEditing={this.toggleIsEditingPass}
                        passEdit={this.state.inputs.password} />
                </div>
            )
        } else {
            return (
                <div className="signup-form-wrapper">
                    <div className="signup-form-container">
                        <h3 className="signup-head">Profile</h3>
                        {this.props.avatar.length === 0 ? "" : <img src={this.props.avatar} alt="Profile" />}
                        <h4 className="signup-form-input">Name: {this.props.name}</h4>
                        <h4 className="signup-form-input">Email: {this.props.email}</h4>
                        <h4 className="signup-form-input">Best Score: {this.props.bestScore}</h4>
                        <div>
                            <button className="signup-butt" onClick={this.toggleIsEditing}>Edit Info</button>
                            <button className="signup-butt" onClick={this.toggleIsEditingPass}>Change Password</button>
                        </div>
                    </div>
                </div>
            )
        }
        // return (
        //     <div className="signup-form-wrapper">
        //         {isEditing
        //             ?
        //             <ProfileViewEdit
        //                 handleChange={this.handleChange}
        //                 handleSubmit={this.handleSubmit}
        //                 errMsg={errMsg}
        //                 toggleIsEditing={this.toggleIsEditing}
        //                 {...this.state} />
        //             :
        //             <div className="signup-form-container">
        //                 <h3 className="signup-head">Profile</h3>
        //                 <img src={this.props.avatar} alt="Profile" />
        //                 <h4 className="signup-form-input">Name: {this.props.name}</h4>
        //                 <h4 className="signup-form-input">Email: {this.props.email}</h4>
        //                 <h4 className="signup-form-input">Best Score: {this.props.bestScore}</h4>
        //                 <button className="signup-butt" onClick={this.toggleIsEditing}>Edit</button>
        //             </div>
        //         }
        //     </div>
        // )
    }
}

// const mapStateToProps = state => state

export default connect(state => state.user, { signup, editUser })(Profile);
