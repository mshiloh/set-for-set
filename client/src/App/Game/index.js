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
            fullDeck: [],
            currentCardIndex: 11,
            hideDeck: false,
            selectedCardsForSet: []
        }
        this.state = this.initialState;
    }

    dealingCards = () => {
        this.props.getCards();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) this.setState(prevState => {
            return {
                ...prevState,
                fullDeck: shuffler(this.props.data)
            }
        });
        // console.log(this.state.fullDeck);
    }

    pauseAndHideDeck = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                hideDeck: !prevState.hideDeck
            }
        })
    }

    selectingCard = (indexSelectedCard) => {
        const { fullDeck } = this.state;
        this.setState(prevState => {
            return {
                selectedCardsForSet: [...prevState.selectedCardsForSet, fullDeck[indexSelectedCard]]
            }
        }, () => {
            if (this.state.selectedCardsForSet.length === 3) {
                //shoot a check set function which will include the
                // unselectingAllCards function
            }
            console.log(this.state.selectedCardsForSet);
            console.log(this.state.selectedCardsForSet.length);
        });
    }

    unselectingAllCards = () => {
        this.setState(prevState => {
            return {
                selectedCardsForSet: this.initialState.selectedCardsForSet
            }
        });
    }

    render() {

        const { fullDeck, hideDeck } = this.state;
        const presentGameLayout = fullDeck.filter((card, i) => i < 12).map((card, i) => <GameDisplay
            key={card._id + i} index={i}
            pauseAndHideDeck={this.pauseAndHideDeck}
            cardId={card._id}
            selectingCard={this.selectingCard}
            {...card} />)

        return (
            <div className="game-wrapper">

                <div className="game-layout">
                    {hideDeck ? ""
                        :
                        <div className="cards-layout">
                            {presentGameLayout}
                        </div>
                    }


                    <div className="stats">

                        <div className="sets-container">
                            <p className="sets-title"> SETS</p>
                            <SetsCounter className="collected-sets"></SetsCounter>
                        </div>

                        <div className="timer-container">
                            <Timer dealingCards={this.dealingCards} className="timer" placeholder="00:00"></Timer>
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