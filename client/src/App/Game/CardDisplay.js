import React from "react";

function CardDisplay(props) {
    const { index, selectedCardsForSet, cardId } = props;
    const isSelected = selectedCardsForSet.find(card => card._id === cardId);
    return (
        <div onClick={() => props.selectingCard(index)} style={{ backgroundImage: `url(${props.image})` }} className={`card ${isSelected ? "selected" : ""}`}></div>
    )
}

export default CardDisplay
