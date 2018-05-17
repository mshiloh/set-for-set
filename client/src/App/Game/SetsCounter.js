import React, { Component } from "react";

import "./style.css";

export default class SetsCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectedSets: props.collectedSets
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
            collectedSets: 0
        });
    }

    render() {
        return (
            <div className="collected-sets">
                <h1>{(this.state.collectedSets)}</h1>
            </div>
        );
    }
}