import React from "react";

import "./style.css";

function Game() {
    return (
        <div className="game-wrapper">
            <div className="game-layout">
            <div className="left">
                
            <div className="stats">
                        <div className="sets-container">
                            SETS
                    <input className="collected-sets" placeholder="0" /></div>
                    </div>

                        <div className="sets-container">
                            TIME
                            <input className="timer" placeholder="00:00" />
                        </div>
                    </div>
                    </div>
    
                <div className="right">

                    <div className="card-layout">
                        <div className="column1">
                            <div className="card card1">1</div>
                            <div className="card card5">5</div>
                            <div className="card card9">9</div>
                        </div>

                        <div className="column2">
                            <div className="card  card2">2</div>
                            <div className="card card6">6</div>
                            <div className="card card10">10</div>
                        </div>

                        <div className="column3">
                            <div className="card card3">3</div>
                            <div className="card card7">7</div>
                            <div className="card card11">11</div>
                        </div>

                        <div className="column4">
                            <div className="card card4">4</div>
                            <div className="card card8">8</div>
                            <div className="card card12">12</div>
                        </div>
                    </div>
                    <div className="game-butts">
                        <button className="start-game">Start Game</button>
                        <button className="new-game">New Game</button>
                    </div>
                
                </div>
            </div>

    )
}

export default Game;