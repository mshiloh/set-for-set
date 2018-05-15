import React, { Component } from "react";

import "./style.css";

export default class SetsCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sets: 0
        }
        this.newGameClick = this.newGameClick.bind(this);
        // this.addSet = this.addSet.bind(this);
    }

    // addSet() {
    //     if (setMatch === true) {
    //         this.setState({
    //             sets: this.state.sets + 1
    //         });
    //     } else {
    //         return state;
    //     }
    // }

    newGameClick() {
        clearInterval(this.incrementer);
        this.setState({
            sets: 0
        });
    }

    render() {
        return (
            <div className="collected-sets">
                <h1>{(this.state.sets)}</h1>
            </div>
        );
    }
}