// Copied from stack overflow
export const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

export const isSolved = (puzzle) => {

    // Sort puzzle by coordinates
    const sortedPuzzle = [...puzzle].sort(function(a, b) {
        return a.y === b.y ? a.x - b.x : a.y - b.y;
      });
    
    // Convert pieces to number array
    const numbers = sortedPuzzle.map(piece => piece.value === 'X' ? sortedPuzzle.length : piece.value);

    // check if each number is smaller than the next;
    let solved = true;
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] > numbers[i+1]) {
            solved = false;
            break;
        }
    }
    return solved;
  }