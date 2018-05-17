export const allDifferent = (cards) => {
    if (cards[0] === cards[1] || cards[1] === cards[2] || cards[0] === cards[2]) {
        return false;
    }
    return true;
}

export const allTheSame = (cards) => {
    return cards[0] === cards[1] && cards[1] === cards[2];
}