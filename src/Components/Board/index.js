import React from 'react';
import Square from '../Square/index';

function Board({squares,onClick,highlight}){

  const renderASquare = (i) => {
    const winRow = [...highlight]
    let isHighlight = false;
    if(winRow.includes(i))
    {
        isHighlight = true;
    }
    return <Square key={i} value = {squares[i]} onClick = {() => onClick(i)} highlight = {isHighlight} />;
  }

  const renderSquares = (i) => {
        let squares = []
        for(let j = 0 ; j < 3 ; j++)
        {
            squares = [...squares, renderASquare(i*3+j)];
        }
        return squares;
    }
  

  const renderARow = (i) => {
      return(
          <div className="board-row" key = {i}>
              {renderSquares(i)}
          </div>
      );
  }

  const renderRows = () => {
    let rows = [];
        for(let i = 0 ; i < 3 ; i++)
        {
            rows = [...rows, renderARow(i)];
        }
        return rows;
  };

  const rows = renderRows();

  return (
    <div>
      {rows}
    </div>
  );
}

export default Board;