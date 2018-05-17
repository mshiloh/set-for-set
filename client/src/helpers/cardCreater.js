//arrays of cards' properties
export const attributes = {
    number: [1, 2, 3],
    color: ["red", "green", "purple"],
    filling: ["striped", "solid", "open"],
    shape: ["squiggle", "diamond", "oval"]
}

export const createCards = () => {
    const cards = [];
    let count = 0;

    // creating the cards' objects
    for (let i = 0; i < attributes.number.length; i++) {
        for (let j = 0; j < attributes.color.length; j++) {
            for (let k = 0; k < attributes.filling.length; k++) {
                for (let l = 0; l < attributes.shape.length; l++) {
                    const card = {};
                    
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