import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let dimensions = 10
  const [ grid, setGrid ] = useState(() => {
    let rows = []
    for(let i = 0; i < dimensions; i ++) {
      rows.push(Array.from(Array(dimensions), () => 1))
    }
    return rows}
    )

let topLeft = null
let topMid = null
let topRight = null
let midLeft = null
let midRight = null
let bottomLeft = null
let bottomMid = null
let bottomRight = null

// console.log(grid)
for(var i=0; i < grid.length; i++){
  for(var j=0; j < grid[i].length; j++){
    if (i !== 0 && i !== grid.length-1 && j !== 0 && j !== grid[i].length-1) {
      topLeft = grid[i-1][j-1]
      topMid = grid[i-1][j]
      topRight = grid[i-1][j+1]
      midLeft = grid[i][j-1]
      midRight = grid[i][j+1]
      bottomLeft = grid[i+1][j-1]
      bottomMid = grid[i+1][j]
      bottomRight = grid[i+1][j+1]
      console.log(`live!!! at: ${j} + ${i}`)
    }
  }
}

console.log(topLeft)
console.log(topMid)
console.log(topRight)
console.log(midLeft)
console.log(midRight)
console.log(bottomLeft)
console.log(bottomMid)
console.log(bottomRight)
console.log((Array.from(Array(15))))
console.log(Array(22))

// let dimensions = 10
// let rows = []
// for(let i = 0; i < dimensions; i ++) {
//   rows.push(Array.from(Array(dimensions), () => 0))
// }
// console.log(rows)


  return (
    <div className="App">
      {grid.map(row => {
        return(
          <>
          {row.map(box => `[${box}]`)}
          <br/>
          </>
        )
        
      })}
    </div>
  );
}

export default App;
