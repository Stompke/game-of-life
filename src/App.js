import React, { useState, useRef, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import produce from 'immer';

let dimensions = 25
function startingCode(){
  let rows = []
  for(let i = 0; i < dimensions; i ++) {
    rows.push(Array.from(Array(dimensions), () => 0 ))
  }
  return rows
}

function App() {
  const [play, setPlay ] = useState(false)
  const [ genNum, setGenNum ] = useState(0)
  const [rangeValue, setRangeValue ] = useState(500)
  const [ grid, setGrid ] = useState( startingCode())



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
          if(i > 0 && i < grid2.length-1 && j > 0 && j < grid2[i].length-1){
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

}


useEffect(() => {
  if(play){
    setGenNum(genNum +1)
    setTimeout(nextStep, 1000-rangeValue)
  }
},[grid])

const runLife = () =>{
  setPlay(true)
  nextStep()
}

const stop = () =>{
  setPlay(false)
}
const clear = () =>{
  setGrid(startingCode())
  setGenNum(0)
}



const changeBox = (index, index2) => {
    if(!play){
      const newGrid = produce(grid, grid2 => {
          grid2[index][index2] = grid[index][index2] ? 0 : 1;
      })
      setGrid(newGrid)
    }
}

const fountain = () => {
  if(!play){
    const newGrid = produce(grid, grid2 => {
      grid2[10][7] = 1
      grid2[10][8] = 1
      grid2[10][9] = 1
      grid2[10][10] = 1
      grid2[10][11] = 1
      grid2[10][12] = 1
      grid2[10][13] = 1
      grid2[10][14] = 1
      grid2[10][15] = 1
      grid2[10][16] = 1
    })
    setGrid(newGrid)
  }
}
const fireworks = () => {
  if(!play){
    const newGrid = produce(grid, grid2 => {
      grid2[10][7] = 1
      grid2[10][8] = 1
      grid2[10][9] = 1
      grid2[10][10] = 1
      grid2[10][11] = 1
      grid2[10][12] = 1
      grid2[10][13] = 1
      grid2[10][14] = 1
      grid2[10][15] = 1
    })
    setGrid(newGrid)
  }
}
const missile = () => {
  if(!play){
    const newGrid = produce(grid, grid2 => {
      grid2[1][2] = 1
      grid2[2][3] = 1
      grid2[3][3] = 1
      grid2[3][2] = 1
      grid2[3][1] = 1

    })
    setGrid(newGrid)
  }
}


const handleRangeChange = e => {
  setRangeValue(e.target.value)
}


  return (
    <div className="App">
      <div className="App-header">
        <div className='game-container'>
          <h1>Conway's Game Of Life</h1>
          <div className='sidebar'>
            <h4>Add a premade pixel</h4>
            {!play && <button onClick={fountain}>Fountain</button> }
            {!play && <button onClick={missile}>Missile</button>}
            {!play && <button onClick={fireworks}>Fireworks</button>}
          </div>
          <div className="grid-container">
            {/* Living cells backgroundColor changes as the Generation Increments */}
            {grid.map((row, index) => <>{row.map((box, index2 ) => <div key={`${index}${index2}`} style={box ? {backgroundColor: `rgb(${genNum}, ${255-genNum}, ${genNum/2})`} : {backgroundColor: ''}} className={`grid-item`} onClick={() => changeBox(index,index2)}></div>)}</>)}
          </div>


          <div className='sidebar'>
            
            Generation: {genNum}
            {!play && <button onClick={clear}>Clear</button> }
            {!play && <button onClick={nextStep}>Next</button>}
            {play ? <button onClick={stop}>stop</button>
            : <button onClick={runLife}>Run Lifecycle</button> }
            
            <input onChange={handleRangeChange} type="range" min="1" max="1000" value={rangeValue}></input>
          </div>
          <div className='sidebar-400'>
            <ul>
              <p>In the Game of Life, these rules examine each cell of the grid. For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.</p>
              <li>Rule 1: If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.</li>
              <li>Rule 2: If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.</li>
            </ul>
          </div>


      
      
        </div>
      </div>
    </div>
  );
}

export default App;
