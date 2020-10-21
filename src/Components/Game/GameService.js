function checkWinner(squares){
    const winPositions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i = 0; i < winPositions.length; i++) {
      const [a, b, c] = winPositions[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a],[a,b,c]];
      }
    }
    return null;
  }
  
  function checkDraw(currentPositionBoard)
  {
      return currentPositionBoard.squares.every(value => value !== null);
  }

  module.exports = {checkWinner,checkDraw}; 