import React from 'react';

function Square({value,onClick,highlight}){

    const colorPlayer = {
      color: value === 'X' ? 'blue' : 'red', 
      backgroundColor: highlight ? 'yellow' : ''
    };   
  
    return (
      <button className="square" onClick = {onClick} style={colorPlayer}>
        {value}
      </button>
    );
  }

  export default Square;