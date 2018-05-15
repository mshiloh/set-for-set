import React from "react";

import "./style.css";

function Rules() {
    return (
        <div className="rules-wrapper">

            <h1 className="rules-head">SET</h1>

            <h2 className="rules-subhead">The Family Game of Visual Perception ®</h2>

            <p className="rules-text">
                Ages: 6 to adult
                <br />
                Number of Players: 1 or more
            </p>
            <br />
            <p className="rules-text">

                The object of the game is to identify a SET of 3 cards from 12 cards placed face up on the table. Each card has four features, which can vary as follows:</p>

            <p className="rules-text">

                A SET consists of 3 cards in which each of the cards’ features, looked at one‐by‐one, are the same on each card, or, are different on each card. All of the features must separately satisfy this rule. In other words: shape must be either the same on all 3 cards, or different on each of the 3 cards; color must be either the same on all 3 cards, or different on each of the 3, etc. See EXAMPLES below.</p>

            <h3 className="rules-section-head">A QUICK CHECK ‐ Is it a SET?</h3>

            <p className="rules-text">

                If 2 cards are the same and 1 card is different in any feature, then it is not a SET. For example, if 2 are red and 1 is purple then it is not a SET. A SET must be either all the same OR all different in each individual feature.</p>

            <h3 className="rules-section-head">EASY START </h3>

            <p className="rules-text">

                For a quick introduction, start with the small deck (just the solid symbols). This eliminates one feature, shading. Once you can quickly see a SET when playing the 3 feature version, shuffle the 2 decks together to play the full game. </p>

            <h3 className="rules-section-head">PLAYING THE GAME</h3>

            <p className="rules-text">

                The dealer shuffles the cards and lays 12 face up on the table (in a rectangle so that they can be seen by all. Players remove SET s of 3 cards from anywhere on the table. Each SET is checked by the other players. If correct, the SET is kept by the player for one point and the dealer replaces the 3 cards with 3 from the deck. A player must call SET before picking up the cards. There are no turns, the first player to call SET gets control of the board. After he/she has called SET, no other player can pick up cards until that player has finished. The SET must be picked up within a few seconds after calling it. If a player calls SET and does not have one, or if the SET is incorrect, he/she loses one point, and the 3 cards are returned to the table. If all players agree that there is not a SET in the 12 cards, 3 more cards are laid face up on the table. </p>

            <p className="rules-text">

                The 3 cards are not replaced when the next SET is found, reducing the number back to 12. Note: There are ~ 33:1 odds that a SET is present in 12 cards, and ~ 2500:1 odds when 15 cards are on the table.</p>

            <p className="rules-text">

                The play continues until the deck is depleted. At the end of the game there may be cards remaining that do not form a SET. The number of SET s held by each player is then counted. One point is given for each SET. High score wins. </p>

            <p className="rules-text">

                If you want a longer game, the deal passes to the person on the dealer’s left, and the play resumes with the deck being reshuffled. When all the players have dealt, the game ends. The player with the highest overall score wins. </p>

            <p className="rules-text">

                When playing solitaire, if the player does not find a SET, 3 more cards are laid down with a penalty of one SET. To win the game, the player must remove this penalty by finding a SET on the table out of the last 12 cards. </p>

            <h3 className="rules-section-head">EXAMPLES</h3>

            <p className="rules-text">

                For example, the following are SETs: </p>

            <div className="example-container">
                <img className="example-sets" src="https://i.imgur.com/2vSBXe6.png" alt="same: color(red), number(2), and shape(oval); different fill" />
            </div>

            <p className="rules-text">

                All three cards have the same shape, the same color, the same number of symbols and they all have different shading. </p>

            <br />

            <div className="example-container">
                <img className="example-sets" src="https://i.imgur.com/ig8P8Oy.png" alt="same: fill(striped); different color, number, and shape" />
            </div>

            <p className="rules-text">

                All three cards have different shapes, different colors, and different numbers of symbols and they all have the same shading. </p>

            <br />

            <div className="example-container">
                <img className="example-sets" src="https://i.imgur.com/rVSfSZ9.png" alt="different color, number, shape, and fill" />
            </div>

            <p className="rules-text">

                All three cards have different shapes, different colors, different numbers of symbols and different shadings. </p>

            <br />
            <br />

        </div>
    )
}

export default Rules
