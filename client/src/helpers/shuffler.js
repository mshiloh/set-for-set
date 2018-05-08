// const arrEx = ["1", "2", "3", "4", "5", "6", "7"];

const shuffler = (arr) => {
    const arrBucket = [];
    let currentIndex;
    while (arr.length) {
        currentIndex = Math.floor(Math.random() * arr.length);
        arrBucket.push(arr.splice(currentIndex, 1)[0]);
    }
    return arrBucket;
}

// console.log(shuffler(arrEx));

export default shuffler;