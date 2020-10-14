import React from 'react';
import Square from './Square';

class Board extends React.Component {
    
    renderSquares(i){
        let squares = []
        for(let j = 0 ; j < 3 ; j++)
        {
            squares = [...squares, this.renderASquare(i*3+j)];
        }
        return squares;
    }
    
    renderASquare(i) {
      const winRow = [...this.props.highlight]
      let isHighlight = false;
      if(winRow.includes(i))
      {
          isHighlight = true;
      }
      return <Square key={i} value = {this.props.squares[i]} onClick = {() => this.props.onClick(i)} highlight = {isHighlight} />;
    }

    renderARow(i){
        return(
            <div className="board-row" key = {i}>
                {this.renderSquares(i)}
            </div>
        );
    }

    renderRows(){
        let rows = [];
        for(let i = 0 ; i < 3 ; i++)
        {
            rows = [...rows, this.renderARow(i)];
        }
        return rows;
    }
  
    render() {
        const rows = this.renderRows();

      return (
        <div>
          {rows}
        </div>
      );
    }
  }

  export default Board;