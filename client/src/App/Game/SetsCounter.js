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

    newGameClick() {
        clearInterval(this.incrementer);
        this.setState({
            collectedSets: 0
        });
    }

    render() {
        return (
            <div className="collected-sets">
                <h1>{(this.props.collectedSets)}</h1>
            </div>
        );
    }
}