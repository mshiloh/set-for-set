import React, { Component } from "react";

import { connect } from "react-redux";

import "./style.css";

import { getCards } from "../../redux/cards";

import shuffler from "../../helpers/shuffler";

import SetsCounter from "./SetsCounter";
import Timer from "./Timer";

class Game extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            fullDeck: props.data
        }
        this.state = this.initialState;
    }

    componentWillMount() {
        this.props.getCards();
        console.log(this.state.fullDeck);
    }

    componentDidMount() {
        const { data } = this.props;
        console.log(data);
        this.setState(prevState => {
            return { ...prevState, fullDeck: shuffler(this.state.fullDeck) }
        })
        console.log(this.state.fullDeck);
    }

    render() {

        const {fullDeck} = this.state;
        const {image} = this.props;

return (
            <div className="game-wrapper">

                <div className="game-layout">

                    <div className="card-layout">

                        <div className="column1">
                        <div className="card card5">1</div>
                           
                            {/* <img className="card card1" src={fullDeck[0].image} alt="card-one"/> */}
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