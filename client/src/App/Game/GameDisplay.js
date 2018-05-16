import React from "react";

function GameDisplay(props) {

    return (
        <div style={{ backgroundImage: `url(${props.image})` }} className="card"></div>
    )
}

export default GameDisplay
