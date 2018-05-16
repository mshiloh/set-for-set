import React from "react";

function GameDisplay(props) {
    const { index } = props;
    return (
        <div onClick={() => props.selectingCard(index)} style={{ backgroundImage: `url(${props.image})` }} className="card"></div>
    )
}

export default GameDisplay
