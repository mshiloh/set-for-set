import React, { Component } from "react";

import "./style.css";

const formatSec = (sec) =>
  Math.floor(sec / 60) +
  ':' +
  ('0' + sec % 60).slice(-2)


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secsPast: 0,
      lastIncrementer: null,
      sets: 0
    };
    this.incrementer = null;
    this.startClick = this.startClick.bind(this);
    this.pauseClick = this.pauseClick.bind(this);
    this.newGameClick = this.newGameClick.bind(this);
  }

  startClick() {
    this.incrementer = setInterval(() =>
      this.setState({
        secsPast: this.state.secsPast + 1
      })
      , 1000);
    this.props.dealingCards();
  }

  restartTmer = () => {
    this.incrementer = setInterval(() =>
      this.setState({
        secsPast: this.state.secsPast + 1
      })
      , 1000);
      this.props.showDeckAfterPause();
  }

  pauseClick = () => {
    clearInterval(this.incrementer);
    this.setState({
      lastIncrementer: this.incrementer
    });
    this.props.pauseAndHideDeck();
  }

  newGameClick() {
    clearInterval(this.incrementer);
    this.setState(prevState => {
      return {secsPast: 0,
      sets: 0
      }
    });
    this.startClick();
    this.props.showDeckAfterPause();
  }
  
  finishGameClick = () => {
    clearInterval(this.incrementer);
    this.setState({
      secsPast: 0,
      sets: 0
    });
    this.props.changeBestScoreUser();
    this.props.endGame();
  }

  render() {
    return (
      <div className="timer-container">
        <h1>{formatSec(this.state.secsPast)}</h1>

        <div className="butts-container">


          {(this.state.secsPast !== 0 &&
            this.incrementer === this.state.lastIncrementer
            ?
            <div className="game-butts">
              <button className="start-game" onClick={this.restartTmer}>RESUME</button>
              <button className="new-game" onClick={this.newGameClick}>NEW GAME</button>
            </div>
            : null
          )}
          {(this.state.secsPast === 0
            ? <button className="start-game" onClick={this.startClick}>START GAME</button>
            : ""
          )}
          <button className="pause-game" onClick={this.pauseClick}>PAUSE</button>
          <button className="pause-game" onClick={this.finishGameClick}>END GAME/SAVE SCORE</button>
        </div>
      </div>

    );
  }
}