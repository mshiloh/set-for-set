import React from "react";  
import {connect} from "react-redux";

function Home(props) {  
    return (
        <div>
            <h2>Welcome, &nbsp; @<i>{ props.name}</i>!</h2>
        </div>
    )
}

export default connect(state => state.user, {})(Home);  
