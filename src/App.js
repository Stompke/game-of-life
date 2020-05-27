import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import produce from 'immer';


function App() {
  let dimensions = 20
  const [play, setPlay ] = useState(false)
  const [rangeValue, setRangeValue ] = useState(500)
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


const nextStep = () => {
  const newGrid = produce(grid, grid2 => {
      for(var i=0; i < grid2.length; i++){
        for(var j=0; j < grid2[i].length; j++){
          let neighbors = 0
          if(i > 0 && i < grid2.length && j > 0 && j < grid2[i].length){
            possibleNeighbors.forEach( item => {
              let x = item[0]
              let y = item[1]
              neighbors += grid[i+x][j+y]
            })
            if(grid[i][j] == 0 && neighbors == 3){
              grid2[i][j] = 1
            } else if(grid[i][j] == 1){
              if (neighbors <= 1){
                grid2[i][j] = 0
              } else if(neighbors >= 4){
                grid2[i][j] = 0
              } else if(neighbors == 2 || neighbors == 3){
                // leave it
              }
            } 
      }
    }
  }
  })
  setGrid(newGrid)
  // setTimeout(nextStep, 500)
}

useEffect(() => {
  if(play){
    setTimeout(nextStep, rangeValue)
  }
},[grid])

const runLife = () =>{
  setPlay(true)
  nextStep()
}

const stop = () =>{
  setPlay(false)
}



const changeBox = (index, index2) => {
    if(!play){
      const newGrid = produce(grid, grid2 => {
          grid2[index][index2] = grid[index][index2] ? 0 : 1;
      })
      setGrid(newGrid)
    }
}


const addNeighbors = (i, j) => {
    const newGrid = produce(grid, grid2 => {
      possibleNeighbors.forEach( item => {
        let x = item[0]
        let y = item[1]
        grid2[i+x][j+y] = 1
      })
    })
    setGrid(newGrid)
}

const handleRangeChange = e => {
  setRangeValue(e.target.value)
}


  return (
    <div className="App">
    <div className="grid-container">
      {grid.map((row, index) => <>{row.map((box, index2 ) => <div key={`${index}${index2}`} className={`grid-item ${box ? 'red' : ''}`} onClick={() => changeBox(index,index2)}></div>)}</>)}
    </div>

    <div className='toolbar'>
      <button onClick={nextStep}>Next</button> 
      {play ? <button onClick={stop}>stop</button>
      : <button onClick={runLife}>Run Lifecycle</button> }
      
      <input onChange={handleRangeChange} type="range" min="1" max="1000" value={rangeValue}></input>
    </div>


      
      
      

    </div>
  );
}

export default App;
