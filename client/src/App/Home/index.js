import React from "react";  
import {connect} from "react-redux";

import "./style.css";

function Home(props) {  
    return (
        <div className="homeWrapper">
            <h2>Welcome, &nbsp; @<i>{ props.name}</i>!</h2>
        </div>
    )
}

export default connect(state => state.user, {})(Home);  
