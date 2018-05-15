import React from "react";
import "./style.css";
import {connect} from "react-redux";
import axios from "axios";
const scoresAxios = axios.create();

scoresAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            scores: [],
            errMsg: "",
            loading: true
        }
    }

    componentDidMount = () => {
        scoresAxios.get(`/api/scores/`)
            .then(response => {
                // console.log(response.data);
                const { data } = response;
                this.setState({
                    scores: data.user,
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    errMsg: err.message
                })
            })
    }


    render = () => {
        // console.log(this.props);
        const { scores, errMsg, loading } = this.state;
        const presentScores = scores.sort((scoreOne, scoreTwo) =>
            scoreOne.bestScore < scoreTwo.bestScore).map((player, i) =>
                <div
                    key={player._id + i} className="oneScore">
                    <h4>{player.name}</h4>
                    <h3>{player.bestScore}</h3>
                </div>
            );

        if (loading) {
            return <h1 style={{ color: "black" }}>... Loading Scores</h1>
        } else if (errMsg) {
            return <p>Sorry, data is not availble right now.</p>
        } else if (scores.length === 0) {
            return (
                <div>
                    No Scores Available
                </div>
            )
        } else {
            return (
                <div>
                    <div className="welcome">
                        <h2>Welcome, &nbsp; @<i>{this.props.name}</i>!</h2>
                    </div>
                    <div className="socresWrap">
                    <div className="ranking">Rankings:</div>
                        {presentScores}
                    </div>
                </div>
            )
        }
    }
}

export default connect(state => state.user, {})(Home);
