import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import produce from 'immer';


function App() {
  let dimensions = 20
  const [ grid, setGrid ] = useState(() => {
    let rows = []
    for(let i = 0; i < dimensions; i ++) {
      rows.push(Array.from(Array(dimensions), () => 0 ))
    }
    return rows}
    )

const possibleNeighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]


const stuff = e => {
  const nextState = produce(grid, newGrid => {
    // newGrid[43][44] = 1
    // newGrid[44][44] = 1
    // newGrid[44][43] = 1
    // newGrid[44][45] = 1
    // newGrid[45][45] = 1
    // newGrid[45][43] = 1
    // newGrid[46][44] = 1
    console.log(e.target)
    console.log(e.target.key)
    console.log(e.target.column)
  })
  setGrid(nextState)
}
const nextStep = e => {
  console.log('next step')
  let nextState = produce(grid, newGrid => {
  for(var i=0; i < dimensions; i++){
    for(var j=0; j < dimensions; j++){
      if(i > 0 && i < dimensions && j > 0 && j < dimensions){
          console.log('for loop', `${i}${j}`)
          let neighbors = 0
          possibleNeighbors.forEach((x) => {
            // console.log(x[0])
            // console.log(x[1])
            // console.log(newGrid[i + x[0]][j + x[1]])
            neighbors += newGrid[i + x[0]][j + x[1]]
          })
          console.log('neighbors', neighbors)
          if(neighbors == 2){
            console.log('stays the same')
          } else if (neighbors == 3) {
                console.log('created')
                newGrid[i][j] = 1
              } 
          else {
            console.log('dies')
            newGrid[i][j] = 0
          }
        }

    }
  }
  })
  // console.log(nextState)
  setGrid(nextState)
}






const running = useRef(null);
// console.log(running)





  return (
    <div className="App">

      {grid.map((row, index) => <div key={`row ${index}`} className='row' >
        {row.map((column, index2 ) => <div onClick={() => {
                const newGrid = produce(grid, grid2 => {
                    grid2[index][index2] = grid[index][index2] ? 0 : 1;
                })
                setGrid(newGrid)
              }}

                 row={index} column={index2.toString()} key={`${index}${index2}`} className='column'>{column}</div>)}
      </div>)}


          
          {/* {row.map(box => <div style={{color: 'red'}} key={'hi'} onClick={stuff}>{box}</div>)} */}
          {/* <br/> */}


       <button onClick={nextStep}>Next</button>
        
      
      
      

    </div>
  );
}

export default App;
