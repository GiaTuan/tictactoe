import React, { useState } from 'react';
import Board from '../Board/index';
import {checkWinner,checkDraw} from './GameService';

function Game(){
  const [history,setHistory] = useState([{
    squares : Array(9).fill(null),
  }]);
  const [stepNumber,setStepNumber] = useState(0);
  const [isXTurn,setIsXTurn] = useState(true);
  const [arrayOfIndexOfSquareClicked,setArrayOfIndexOfSquareClicked] = useState([]);
  const [isAscendantPosition,setIsAscendantPosition] = useState(true);
  const [winRow,setWinRow] = useState([]);


  const handleSquareClicked = (i) => {
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const tempSquares = current.squares.slice();
    if(winRow.length > 0 && stepNumber !== history.length -1){
      setWinRow([]);
    }

    if(tempSquares[i] || winRow.length > 0){
      return;
    }   

    tempSquares[i] = isXTurn ? 'X' : 'O';

    const checkWin = checkWinner(tempSquares);

    if(checkWin !== null)
    {
      setWinRow(checkWin[1]);
    }

    const temparrayOfIndexOfSquareClicked = arrayOfIndexOfSquareClicked.slice(0,stepNumber);

    setHistory(tempHistory.concat([{
      squares: tempSquares
    }]));
    setStepNumber(tempHistory.length);
    setIsXTurn(!isXTurn);
    setArrayOfIndexOfSquareClicked([...temparrayOfIndexOfSquareClicked,i]);
  }

  const jumpTo = (key) => {
    setStepNumber(key);
    setIsXTurn(key%2 === 0);
  }

  const getStatusGame = (current) => {
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
        status = 'Next player: ' + (isXTurn ? 'X' : 'O');
      }
    } 
    return status;
  }


  
  const generateHistory = (value,key) =>{
    let nSquare;
    if(key !== 0)
    {
      nSquare = arrayOfIndexOfSquareClicked[key-1];
    }
    const notify = key === 0 ? "Go to game start" : "Go to move #(" + (nSquare%3+1) + "," + (Math.floor(nSquare/3)+1) + ")";
    
    const boldHistorySelection = {
        fontWeight: key === stepNumber ? 'bold' : ''
    };
    return (
      <li key={key}>
        <button style={boldHistorySelection} onClick = {()=> jumpTo(key)}>{notify}</button>
      </li>
    );
  }

  const reverseHistoryClick = () => {
    setIsAscendantPosition(!isAscendantPosition);
  }


  const tempHistory = history;
  const current = tempHistory[stepNumber];
  const status = getStatusGame(current);
  const historyButtons = tempHistory.map((value,key) => generateHistory(value,key));
  if(!isAscendantPosition) historyButtons.reverse();
  

  return(
    <div className="game">
      <div className="game-board">
        <Board squares = {current.squares} onClick = {(i) => handleSquareClicked(i)} highlight = {winRow} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div><button onClick = {reverseHistoryClick}>Reverse history list</button></div>
        <ol>{historyButtons}</ol>
      </div>
    </div>
  );
}


  export default Game;