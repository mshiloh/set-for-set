import React, { Component } from "react";

export default class GameComponent extends Component {
    render() {
        const {image} = this.props;
        return (
            <div>
                <img src={image} alt=""/>
            </div>
        )
    }
}
