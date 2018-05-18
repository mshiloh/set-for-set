import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import { getCards } from "../../redux/cards";
import { editUser } from "../../redux/auth.js";
import shuffler from "../../helpers/shuffler.js";
import SetsCounter from "./SetsCounter";
import Timer from "./Timer";
import CardDisplay from "./CardDisplay.js";

// import { attributes } from "./../../helpers/cardCreater.js";
// import { allDifferent, allTheSame } from "./../../helpers/allSameAllDiff.js";
// import { Combinator } from "./../../helpers/combinator.js";

class Game extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.initialState = {
            fullDeck: [],
            currentCardIndex: 11,
            cardsOnDeck: [],
            hideDeck: false,
            selectedCardsForSet: [],
            collectedSets: 0,
            userBestScore: props.user.bestScore,
            gameOn: false,
            messageForSet: false,
            gameMessage: ""
        }
        this.state = this.initialState;
    }

    dealingCards = () => {
        this.props.getCards();
        this.setState(prevState => {
            return {
                ...prevState,
                collectedSets: 0,
                gameOn: true
            }
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.cards.data !== this.props.cards.data)
            return this.setState(prevState => {
                const shuffledCards = shuffler(this.props.cards.data);
                return {
                    fullDeck: shuffledCards,
                    cardsOnDeck: shuffledCards.slice(0, 12)
                }
            });
    }

    pauseAndHideDeck = () => {
        this.setState(prevState => {
            return {
                hideDeck: true
            }
        })
    }
    showDeckAfterPause = () => {
        this.setState(prevState => {
            return {
                hideDeck: false
            }
        })
    }
    endGame = () => {
        this.setState(prevState => {
            return {
                ...this.initialState,
                fullDeck: prevState.fullDeck
            }
        })
    }

    changeBestScoreUser = () => {
        if (this.state.userBestScore < this.state.collectedSets) {
            this.props.editUser(this.props.user._id, { bestScore: this.state.collectedSets });
        }
    }

    addCards = () => {
        const { selectedCardsForSet, cardsOnDeck, currentCardIndex } = this.state;
        const for12 = Math.floor(Math.random() * 12);
        const for11 = Math.floor(Math.random() * 11);
        const for10 = Math.floor(Math.random() * 10);
        const newDeck = [...cardsOnDeck];
        newDeck.splice(for12, 1);
        newDeck.splice(for11, 1);
        newDeck.splice(for10, 1);

        this.setState(prevState => {
            return {
                cardsOnDeck: [...newDeck, ...prevState.fullDeck.slice((currentCardIndex + 1), (currentCardIndex + 4))],
                currentCardIndex: prevState.currentCardIndex + 3,
                selectedCardsForSet: this.initialState.selectedCardsForSet
            }
        });
    }

    selectingCard = (indexSelectedCard) => {
        this.setState(prevState => {
            if (prevState.selectedCardsForSet.find(card => card._id === prevState.cardsOnDeck[indexSelectedCard]._id)) return {
                selectedCardsForSet: prevState.selectedCardsForSet.filter(card => card._id !== prevState.cardsOnDeck[indexSelectedCard]._id)
            }
            return {
                selectedCardsForSet: [...prevState.selectedCardsForSet, prevState.cardsOnDeck[indexSelectedCard]]
            }
        }, () => {
            if (this.state.selectedCardsForSet.length === 3) {
                const cardsForCheck = this.state.selectedCardsForSet;
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
                    const newDeck = cardsOnDeck.filter(card => {
                        return (
                            card._id !== selectedCardsForSet[0]._id && card._id !== selectedCardsForSet[1]._id
                            && card._id !== selectedCardsForSet[2]._id)
                    }).map(card => card);

                    this.setState(prevState => {
                        return {
                            cardsOnDeck: [...newDeck, ...prevState.fullDeck.slice((currentCardIndex + 1), (currentCardIndex + 4))],
                            currentCardIndex: prevState.currentCardIndex + 3,
                            collectedSets: prevState.collectedSets + 1,
                            selectedCardsForSet: this.initialState.selectedCardsForSet,
                            messageForSet: true,
                            gameMessage: "Good, job! That's a SET!"
                        }
                    }, () =>
                            setTimeout(() => {
                                this.setState(prevState => {
                                    return {
                                        messageForSet: this.initialState.messageForSet,
                                        gameMessage: this.initialState.gameMessage
                                    }
                                });
                            }, 2000)
                    );
                } else {
                    // console.log("NO SET FOUND");
                    this.setState(prevState => {
                        return {
                            selectedCardsForSet: this.initialState.selectedCardsForSet,
                            messageForSet: true,
                            gameMessage: "This is not a SET!"
                        }
                    }, () =>
                            setTimeout(() => {
                                this.setState(prevState => {
                                    return {
                                        messageForSet: this.initialState.messageForSet,
                                        gameMessage: this.initialState.gameMessage
                                    }
                                });
                            }, 2000))
                }
            }
        });
    }

    render = () => {
        // console.log(this.state);
        const { cardsOnDeck, hideDeck,
            collectedSets, messageForSet,
            selectedCardsForSet, fullDeck, gameMessage,
            gameOn,
            currentCardIndex } = this.state;
        const presentGameLayout = cardsOnDeck.map((card, i) => <CardDisplay
            key={card._id + i} index={i}
            cardId={card._id}
            selectingCard={this.selectingCard}
            selectedCardsForSet={selectedCardsForSet}
            {...card} />)

        return (
            <div className="game-wrapper">

                <div className="game-layout">
                    {hideDeck ?
                        <div className="cards-layout">
                            <p>Pausing!</p>
                        </div>
                        :
                        <div className="cards-layout">
                            {presentGameLayout}
                        </div>
                    }

                    <div className="stats">
                        <div className="message-for-set">
                            {!messageForSet && gameOn ? <p className="checkSet">Cards left: {fullDeck.length - (currentCardIndex + 1)}</p>
                                : <p style={{ backgroundColor: "yellow" }} className="checkSet">{gameMessage}</p>}
                        </div>
                        <div className="sets-container">
                            <p className="sets-title"> SETS</p>
                            <SetsCounter collectedSets={collectedSets} className="collected-sets" />
                        </div>
                        <div className="timer-container">
                            <Timer trackCards={fullDeck.length - (currentCardIndex + 1)}
                             addCards={this.addCards}
                                changeBestScoreUser={this.changeBestScoreUser}
                                endGame={this.endGame}
                                showDeckAfterPause={this.showDeckAfterPause} pauseAndHideDeck={this.pauseAndHideDeck} dealingCards={this.dealingCards} className="timer" placeholder="00:00"></Timer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { getCards, editUser })(Game);