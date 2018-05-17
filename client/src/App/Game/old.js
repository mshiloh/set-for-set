// import React, { Component } from "react";
// import { connect } from "react-redux";
// import "./style.css";
// import { getCards } from "../../redux/cards";
// import shuffler from "../../helpers/shuffler.js";
// import SetsCounter from "./SetsCounter";
// import Timer from "./Timer";
// import GameDisplay from "./GameDisplay.js";
// // import { attributes } from "./../../helpers/cardCreater.js";
// // import { allDifferent, allTheSame } from "./../../helpers/allSameAllDiff.js";
// // import { Combinator } from "./../../helpers/combinator.js";

// class Game extends Component {
//     constructor(props) {
//         super(props);
//         this.initialState = {
//             fullDeck: [],
//             currentCardIndex: 11,
//             cardsOnDeck: [],
//             hideDeck: false,
//             selectedCardsForSet: [],
//             
//             collectedSets: 0,
//             isMatch: false
//         }
//         this.state = this.initialState;
//     }

//     dealingCards = () => {
//         this.props.getCards();
//     }

//     componentDidUpdate = (prevProps, prevState) => {
//         if (prevProps.data !== this.props.data)
//             return this.setState(prevState => {
//                 const shuffledCards = shuffler(this.props.data);
//                 return {
//                     // ...prevState,
//                     fullDeck: shuffledCards,
//                     cardsOnDeck: shuffledCards.slice(0, 12)
//                 }
//             }, () => {
//                 console.log(this.state.cardsOnDeck)
//                 // console.log(this.state.fullDeck)
//             }
//             );
//     }

//     pauseAndHideDeck = () => {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 hideDeck: !this.state.hideDeck
//             }
//         })
//     }

//     selectingCard = (indexSelectedCard) => {
//         const { fullDeck, isMatch } = this.state;
//         this.setState(prevState => {
//             return {
//                 selectedCardsForSet: [...prevState.selectedCardsForSet, fullDeck[indexSelectedCard]]
//             }
//         }, () => {
//             if (this.state.selectedCardsForSet.length === 3) {
//                 const cardsForCheck = this.state.selectedCardsForSet;
//                 if ((cardsForCheck[0].number !== cardsForCheck[1].number &&
//                     cardsForCheck[1].number !== cardsForCheck[2].number &&
//                     cardsForCheck[0].number !== cardsForCheck[2])
//                     ||
//                     (cardsForCheck[0].number === cardsForCheck[1].number &&
//                         cardsForCheck[1].number === cardsForCheck[2].number)) {
//                     if ((cardsForCheck[0].color !== cardsForCheck[1].color &&
//                         cardsForCheck[1].color !== cardsForCheck[2].color &&
//                         cardsForCheck[0].color !== cardsForCheck[2])
//                         ||
//                         (cardsForCheck[0].color === cardsForCheck[1].color &&
//                             cardsForCheck[1].color === cardsForCheck[2].color)) {
//                         if ((cardsForCheck[0].filling !== cardsForCheck[1].filling &&
//                             cardsForCheck[1].filling !== cardsForCheck[2].filling &&
//                             cardsForCheck[0].filling !== cardsForCheck[2])
//                             ||
//                             (cardsForCheck[0].filling === cardsForCheck[1].filling &&
//                                 cardsForCheck[1].filling === cardsForCheck[2].filling)) {
//                             if ((cardsForCheck[0].shape !== cardsForCheck[1].shape &&
//                                 cardsForCheck[1].shape !== cardsForCheck[2].shape &&
//                                 cardsForCheck[0].shape !== cardsForCheck[2])
//                                 ||
//                                 (cardsForCheck[0].shape === cardsForCheck[1].shape &&
//                                     cardsForCheck[1].shape === cardsForCheck[2].shape)) {
//                                 this.setState(prevState => {
//                                     return {
//                                         isMatch: !this.state.isMatch
//                                     }
//                                 })
//                                 // setTimeout(function () {
//                                 //     this.setState(prevState => {
//                                 //         return {
//                                 //             messageForSet: false
//                                 //         }
//                                 //     });
//                                 // }, 3000);
//                                 // console.log(this.state.selectedCardsForSet.length);
//                             }
//                         }
//                     }
//                     if (isMatch) {
//                         // get 3 new cards
//                         // clear the selected array/cards
//                         // remove highlight on selected cards
//                         // add +1 to score
//                         // show a pop-up for "Good, job! That's a SET!"

//                         console.log("Now there - SET");
//                         // this.setState(prevState => {
//                         //     return {
//                         //         messageForSet: true
//                         //     }
//                         // });
//                     } else {
//                         // clear the selected array/cards
//                         // remove highlight on selected cards
//                         // show a pop-up for "Not a set - try again"

//                         console.log("No SET");
//                     }
//                 }
//             }
//         });
//     }

//     unselectingAllCards = () => {
//         this.setState(prevState => {
//             return {
//                 selectedCardsForSet: this.initialState.selectedCardsForSet
//             }
//         });
//     }

//     switchMessage = () => {
//         this.setState(prevState => {
//             return {
//                 messageForState: "Good job! Thats a set"
//             }
//         });
//     }

//     // @josefie github.com
//     // isAttributeMatch = (attributesValues) => {
//     //     if (!allTheSame(attributesValues) && !allDifferent(attributesValues)) {
//     //         return false;
//     //     }
//     //     return true;
//     // }
//     // getCardById = (id) => {
//     //     const allCards = this.state.fullDeck;
//     //     const index = allCards.map((card) => card._id).indexOf(id);
//     //     console.log(index);
//     //     return allCards[index];
//     // }
//     // doCardsMatch = (possibleSet) => {
//     //     let cards = possibleSet.map((id) => this.getCardById(id));

//     //     return Object.keys(attributes).every((attribute) => {
//     //         let attributeValues = cards.map((card) => card[attribute]);
//     //         return this.isAttributeMatch(attributeValues);
//     //     });
//     // }
//     // findSets = () => {
//     //     let combinations = Combinator.getAllCombinations(this.state.cardsOnDeck, 3);

//     //     let setsInCurrentCards = [];

//     //     for (let i = 0; i < combinations.length; i++) {
//     //         if (this.doCardsMatch(combinations[i])) {
//     //             setsInCurrentCards.push(combinations[i]);
//     //         }
//     //     }
//     //     console.log(setsInCurrentCards)
//     //     return setsInCurrentCards;
//     // }
//     // -----

//     render = () => {

//         const { cardsOnDeck, hideDeck, messageForSet, collectedSets } = this.state;
//         const presentGameLayout = cardsOnDeck/*.filter((card, i) => i < 12)*/.map((card, i) => <GameDisplay
//             key={card._id + i} index={i}
//             cardId={card._id}
//             selectingCard={this.selectingCard}
//             {...card} />)

//         return (
//             <div className="game-wrapper">

//                 <div className="game-layout">
//                     {hideDeck ? ""
//                         :
//                         <div className="cards-layout">
//                             {presentGameLayout}
//                         </div>
//                     }


//                     <div className="stats">
//                         <div className="message-for-set">
//                             {!messageForSet ? <p style={{ backgroundColor: "red" }}>"No SET yet!"</p>
//                                 : <p style={{ backgroundColor: "green" }}>"Good, job! That's a SET!"</p>}

//                         </div>
//                         <div className="sets-container">
//                             <p className="sets-title"> SETS</p>
//                             <SetsCounter collectedSets={collectedSets} className="collected-sets" />
//                         </div>
//                         {/* <div className="message-for-possible">
//                             <p>{this.findSets().length}</p>
//                         </div> */}
//                         <div className="timer-container">
//                             <Timer pauseAndHideDeck={this.pauseAndHideDeck} dealingCards={this.dealingCards} className="timer" placeholder="00:00"></Timer>
//                         </div>

//                     </div>

//                 </div>

//             </div>
//         )
//     }
// }


// const mapStateToProps = state => {
//     return state.cards
// }

// export default connect(mapStateToProps, { getCards })(Game);