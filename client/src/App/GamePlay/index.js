import React, { Component } from "react";

import { connect } from "react-redux";

import {getCards} from "../../redux/cards";

import GameComponent from "./GameComponent";
import Timer from "./Timer";
class GamePlay extends Component {
    componentDidMount(){
        this.props.getCards();
    }
    render() {
        const {data} = this.props;
        const dealtCards = data.map((card, i) => <GameComponent key={card + i} {...card}></GameComponent>)
        return (
            <div>
                {dealtCards}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.cards
}

export default connect(mapStateToProps, { getCards })(GamePlay);