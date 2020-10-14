import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares : Array(9).fill(null),
      }],
      stepNumber : 0,
      isXTurn : true,
      arrayOfIndexOfSquareClicked: [],
      isAscendantPosition: true,
      winRow: []
    }
  }

  handleSquareClicked(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const tempSquares = current.squares.slice();
    if(this.state.winRow.length > 0 && this.state.stepNumber !== this.state.history.length -1){
      this.setState({
        winRow: []
      })
    }

    if(tempSquares[i] || this.state.winRow.length > 0){
      return;
    }   

    tempSquares[i] = this.state.isXTurn ? 'X' : 'O';

    const checkWin = checkWinner(tempSquares);

    if(checkWin !== null)
    {
      this.setState({
        winRow: checkWin[1]
      });
    }


    const temparrayOfIndexOfSquareClicked = this.state.arrayOfIndexOfSquareClicked.slice(0,this.state.stepNumber);

    this.setState({
      history : history.concat([{
        squares: tempSquares
      }]),
      stepNumber : history.length,
      isXTurn : !this.state.isXTurn,
      arrayOfIndexOfSquareClicked: [...temparrayOfIndexOfSquareClicked,i]
    });
  }

  jumpTo(key)
  {
    this.setState({
      stepNumber: key,
      isXTurn: (key % 2) === 0,
    });
  }

  getStatusGame(current)
  {
    const result = checkWinner(current.squares);
    let winner = null;
    if(result !== null)
    {
        winner = result[0];
    }
    let status;
    
    if(checkDraw(current) && winner === null)
    {
      status = 'Draw match';
    }
    else{
      if (winner) {
        status = 'Winner: ' + winner;
      } 
      else {
        status = 'Next player: ' + (this.state.isXTurn ? 'X' : 'O');
      }
    } 
    return status;
  }


  
  generateHistory(value,key)
  {
    let nSquare;
    if(key !== 0)
    {
      nSquare = this.state.arrayOfIndexOfSquareClicked[key-1];
    }
    const notify = key === 0 ? "Go to game start" : "Go to move #(" + (nSquare%3+1) + "," + (Math.floor(nSquare/3)+1) + ")";
    
    const boldHistorySelection = {
        fontWeight: key === this.state.stepNumber ? 'bold' : ''
    };
    return (
      <li key={key}>
        <button style={boldHistorySelection} onClick = {()=> this.jumpTo(key)}>{notify}</button>
      </li>
    );
  }

    reverseHistoryClick = () => {
        this.setState({
            isAscendantPosition: !this.state.isAscendantPosition
        })
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const status = this.getStatusGame(current);
      const historyButtons = history.map((value,key) => this.generateHistory(value,key));
      if(!this.state.isAscendantPosition) historyButtons.reverse();
  
      return (
        <div className="game">
          <div className="game-board">
            <Board squares = {current.squares} onClick = {(i) => this.handleSquareClicked(i)} highlight = {this.state.winRow} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div><button onClick = {this.reverseHistoryClick}>Reverse history list</button></div>
            <ol>{historyButtons}</ol>
          </div>
        </div>
      );
    }
  }

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

  export default Game;