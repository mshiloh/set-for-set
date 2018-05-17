// Source: http://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/

let combinations = [];

function combinate(options, currentCombination, start, end, index, combinationSize) {

  if (index === combinationSize) {
    combinations.push(currentCombination.slice());
    return;
  }

  // replace index with all possible elements. The condition
  // "end-i+1 >= r-index" makes sure that including one element
  // at index will make a combination with remaining elements
  // at remaining positions
  for (let i = start; (i <= end) && (end-i+1 >= combinationSize-index); i++) {
    currentCombination[index] = options[i].id;
    combinate(options, currentCombination, i+1, end, index+1, combinationSize);
  }
}

export class Combinator {
  static getAllCombinations(options, combinationSize) {
    combinations = [];
    let total = options.length;
    let currentCombination = [];

    combinate(options, currentCombination, 0, total-1, 0, combinationSize);

    return combinations;
  }
}