const createCards = () => {
    const cards = [];
    let count = 0;

    //arrays of cards' properties
    const numbers = [1, 2, 3],
        colors = ["red", "green", "blue"],
        fillings = ["striped", "solid", "empty"],
        shapes = ["parallelogram", "diamond", "oval"];

    // creating the cards' objects
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
                }
            }
        }
    }
    return cards;
}

// console.log(createCards());

export default createCards;