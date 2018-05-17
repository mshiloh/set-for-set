import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import { getCards } from "../../redux/cards";
import shuffler from "../../helpers/shuffler.js";
import SetsCounter from "./SetsCounter";
import Timer from "./Timer";
import GameDisplay from "./GameDisplay.js";
// import { attributes } from "./../../helpers/cardCreater.js";
// import { allDifferent, allTheSame } from "./../../helpers/allSameAllDiff.js";
// import { Combinator } from "./../../helpers/combinator.js";

class Game extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            fullDeck: [],
            currentCardIndex: 11,
            cardsOnDeck: [],
            hideDeck: false,
            selectedCardsForSet: [],
            messageForState: "Find a SET or check the game rules!",
            collectedSets: 0,
            messageForSet: false
        }
        this.state = this.initialState;
    }

    dealingCards = () => {
        this.props.getCards();
        this.setState(prevState => {
            collectedSets: 0
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.data !== this.props.data)
            return this.setState(prevState => {
                const shuffledCards = shuffler(this.props.data);
                return {
                    // ...prevState,
                    fullDeck: shuffledCards,
                    cardsOnDeck: shuffledCards.slice(0, 12)
                }
            }, () => {
                console.log(this.state.cardsOnDeck)
                // console.log(this.state.fullDeck)
            }
            );
    }

    pauseAndHideDeck = () => {
        this.setState(prevState => {
            return {
                hideDeck: prevState.hideDeck
            }
        })
    }

    selectingCard = (indexSelectedCard) => {
        const { fullDeck, isMatch } = this.state;
        this.setState(prevState => {
            return {
                selectedCardsForSet: [...prevState.selectedCardsForSet, fullDeck[indexSelectedCard]]
            }
        }, () => {
            if (this.state.selectedCardsForSet.length === 3) {
                const cardsForCheck = this.state.selectedCardsForSet;
                //shoot a checkForSet function which will include the
                // unselectingAllCards function
                //shoot a fn that changes state or displays a message
                // either "Nice - you got a set!" || "Nope, that's not a state!"
                if (
                    ((cardsForCheck[0].number !== cardsForCheck[1].number &&
                        cardsForCheck[1].number !== cardsForCheck[2].number &&
                        cardsForCheck[0].number !== cardsForCheck[2].number)
                        ||
                        (cardsForCheck[0].number === cardsForCheck[1].number &&
                            cardsForCheck[1].number === cardsForCheck[2].number))

                    &&

                    ((cardsForCheck[0].color !== cardsForCheck[1].color &&
                        cardsForCheck[1].color !== cardsForCheck[2].color &&
                        cardsForCheck[0].color !== cardsForCheck[2].color)
                        ||
                        (cardsForCheck[0].color === cardsForCheck[1].color &&
                            cardsForCheck[1].color === cardsForCheck[2].color))

                    &&

                    ((cardsForCheck[0].filling !== cardsForCheck[1].filling &&
                        cardsForCheck[1].filling !== cardsForCheck[2].filling &&
                        cardsForCheck[0].filling !== cardsForCheck[2].filling)
                        ||
                        (cardsForCheck[0].filling === cardsForCheck[1].filling &&
                            cardsForCheck[1].filling === cardsForCheck[2].filling))

                    &&

                    ((cardsForCheck[0].shape !== cardsForCheck[1].shape &&
                        cardsForCheck[1].shape !== cardsForCheck[2].shape &&
                        cardsForCheck[0].shape !== cardsForCheck[2].shape)
                        ||
                        (cardsForCheck[0].shape === cardsForCheck[1].shape &&
                            cardsForCheck[1].shape === cardsForCheck[2].shape))
                ) {
                    const { selectedCardsForSet, cardsOnDeck, currentCardIndex } = this.state;
                    // console.log("SET FOUND");
                    const newDeck = cardsOnDeck.filter(card => {
                        return (
                            card._id !== selectedCardsForSet[0]._id && card._id !== selectedCardsForSet[1]._id
                            && card._id !== selectedCardsForSet[2]._id)
                    }).map(card => card);

                    this.setState(prevState => {
                        return {
                            cardsOnDeck: [...newDeck, ...fullDeck.slice((currentCardIndex + 1), (currentCardIndex + 4))],
                            currentCardIndex: prevState.currentCardIndex + 3,
                            collectedSets: prevState.collectedSets + 1,
                            selectedCardsForSet: [],
                            messageForSet: true
                        }
                    }, () => /*console.log(selectedCardsForSet.length) */
                            setTimeout(() => {
                                this.setState(prevState => {
                                    return {
                                        messageForSet: false
                                    }
                                });
                            }, 3000)
                    );
                } else {
                    console.log("NO SET FOUND");
                    this.setState({ selectedCardsForSet: [] });
                }
            }
            // console.log(this.state.selectedCardsForSet);
        });
    }

    unselectingAllCards = () => {
        this.setState(prevState => {
            return {
                selectedCardsForSet: this.initialState.selectedCardsForSet
            }
        });
    }

    switchMessage = () => {
        this.setState(prevState => {
            return {
                messageForState: "Good job! Thats a set"
            }
        });
    }

    render = () => {

        const { cardsOnDeck, hideDeck, messageForState,
            collectedSets, messageForSet } = this.state;
        const presentGameLayout = cardsOnDeck/*.filter((card, i) => i < 12)*/.map((card, i) => <GameDisplay
            key={card._id + i} index={i}
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
                        <div className="message-for-set">
                            {!messageForSet ? <p className="noSet">"No SET yet!"</p>
                                : <p className="yesSet">"Good, job! That's a SET!"</p>}
                        </div>
                        <div className="sets-container">
                            <p className="sets-title"> SETS</p>
                            <SetsCounter collectedSets={collectedSets} className="collected-sets" />
                        </div>
                        <div className="timer-container">
                            <Timer pauseAndHideDeck={this.pauseAndHideDeck} dealingCards={this.dealingCards} className="timer" placeholder="00:00"></Timer>
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