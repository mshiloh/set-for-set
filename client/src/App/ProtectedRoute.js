import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
    render() {
        const isAuthenticated = this.props.isAuthenticated;
        const Component = this.props.component;
        const path = this.props.path;
        return (
            isAuthenticated ?
                <Route path={path} render={(props) => {
                    return <Component {...props} />
                }} /> :
                <Redirect to="/login" />
        )
    }
}

const mapStateToProps = (state) => {
    return state.user;
}

export default connect(mapStateToProps, {})(ProtectedRoute);