import React from "react";

import moment from "moment";

import "./style.css";

import SetsCounter from "./SetsCounter";
import Timer from "./Timer";

function Game() {
    return (
        <div className="game-wrapper">

            <div className="game-layout">

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

export default Game;

// export default class Game extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             timer: null,
//             counter: 0,
//             sets: 0
//         }
//         this.tick = this.tick.bind(this);
//     }

//     componentDidMount() {
//         let timer = setInterval(this.tick, 1000);
//         this.setState({ timer });
//     }

//     componentWillUnmount() {
//         this.clearInterval(this.state.timer);
//     }
//     tick(event) {
//         this.setState({
//             counter: this.state.counter + 1
//         });
//     }
//     render() {

//         return (
//             <div className="game-wrapper">

//                 <div className="game-layout">

//                 <div className="game-butts">
//                         <button onClick={this.tick} className="start-game">Start Game</button>
//                         <button className="new-game">New Game</button>
//                     </div>

//                     <div className="card-layout">

//                         <div className="column1">
//                             <div className="card card1">1</div>
//                             <div className="card card5">5</div>
//                             <div className="card card9">9</div>
//                         </div>

//                         <div className="column2">
//                             <div className="card  card2">2</div>
//                             <div className="card card6">6</div>
//                             <div className="card card10">10</div>
//                         </div>

//                         <div className="column3">
//                             <div className="card card3">3</div>
//                             <div className="card card7">7</div>
//                             <div className="card card11">11</div>
//                         </div>

//                         <div className="column4">
//                             <div className="card card4">4</div>
//                             <div className="card card8">8</div>
//                             <div className="card card12">12</div>
//                         </div>
//                     </div>


//                     <div className="stats">
//                         <div className="collected-sets">SETS: {this.state.sets} </div>
//                         <div className="timer">TIME: {this.state.counter}</div>
//                     </div>

//                 </div>

//             </div>
//         )
//     }
// }