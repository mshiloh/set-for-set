const createCards = () => {
    const cards = [];
    let count = 0;

    //arrays of cards' properties
    const attributes = {
        number =[1, 2, 3],
        color =["red", "green", "blue"],
        filling =["striped", "solid", "empty"],
        shape =["squiggle", "diamond", "oval"]
    }

    // creating the cards' objects
    for (let i = 0; i < number.length; i++) {
        for (let j = 0; j < color.length; j++) {
            for (let k = 0; k < filling.length; k++) {
                for (let l = 0; l < shape.length; l++) {
                    const card = {};
                    //!
                    card.id = count++;
                    card.number = attributes.number[i];
                    card.color = attributes.color[j];
                    card.filling = attributes.filling[k];
                    card.shape = attributes.shape[l];
                    cards.push(card);
                }
            }
        }
    }
    return cards;
}

// console.log(createCards());

export default createCards;