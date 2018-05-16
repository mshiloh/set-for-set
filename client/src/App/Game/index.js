import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import { getCards } from "../../redux/cards";
import shuffler from "../../helpers/shuffler.js";
import SetsCounter from "./SetsCounter";
import Timer from "./Timer";
import GameDisplay from "./GameDisplay.js";

class Game extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            fullDeck: shuffler(props.data),
            currentCardIndex: 14
        }
        this.state = this.initialState;
    }

    componentDidMount() {
        this.props.getCards();
        // console.log(this.state.fullDeck);
    }

    render() {

        const { fullDeck } = this.state;
        const presentGameLayout = fullDeck.filter((card, i) => i < 12).map((card, i) => <GameDisplay
            key={card._id + i} index={i} cardId={card._id} {...card} />)

        return (
            <div className="game-wrapper">

                <div className="game-layout">

                    <div className="cards-layout">
                        {presentGameLayout}
                    </div>

                    <div className="stats">

                        <div className="sets-container">
                            <p className="sets-title"> SETS</p>
                            <SetsCounter className="collected-sets"></SetsCounter>
                        </div>

                        <div className="timer-container">
                            <Timer className="timer" placeholder="00:00"></Timer>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return state.cards
}

export default connect(mapStateToProps, { getCards })(Game);