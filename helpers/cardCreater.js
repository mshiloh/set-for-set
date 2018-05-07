// import axios from "axios";

const createCard = () => {
    const cards = [];
    //!
    let count = 0;
    
    //arrays of cards' properties
    const numbers = [1, 2, 3],
        colors = ["green", "red", "blue"],
        fillings = ["striped", "solid", "empty"],
        shapes = ["squiggle", "rhombus", "oval"];

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < colors.length; j++) {
            for (let k = 0; k < fillings.length; k++) {
                for (let l = 0; l < shapes.length; l++) {
                    const card = {};
                    //!
                    card.id = count++;
                    card.number = numbers[i];
                    card.color = colors[j];
                    card.filling = fillings[k];
                    card.shape = shapes[l];
                    cards.push(card);
                    // axios.post(`/api/cards/`, card)
                    //     .then(response => { })
                    //     .catch(err => { });
                }
            }
        }
    }
    return cards;
}

console.log(createCard());