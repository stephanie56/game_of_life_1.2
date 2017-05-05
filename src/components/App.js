import React, { Component } from 'react';
import Row from './Row';
import ControlPanel from './ControlPanel';
import SizePanel from './SizePanel';
import '../styles/App.css';

class App extends Component {
  // manage state
  constructor(){
    super();
    this.state = {
      width:50,
      height:30,
      speed:1000,
      generation:0,
      board:[],
    }
  }

  componentWillMount(){
    this._initBoard(this.state.width, this.state.height);
  }

  componentDidMount(){
    this.timerId = setInterval(() => this._getGen(), 1000);
  }

   componentWillUnmount(){
     clearInterval(this.timerId);
   }

  // method to initialize a new board with width & height
  // called when (1) first init (componentWillMount) & (2) width and height are updated
  _initBoard(w, h){
    const boardCopy = [];
    for(let i = 0; i < h; i++){
      const row = [];
        for(let j = 0; j < w; j++){
          row.push(Math.round(Math.random()));
        }
      boardCopy.push(row);
    }
    // update state with boardCopy
    this.setState({
      board: boardCopy,
    });
  }

  // method to get updated state from Cell and update this.state.board
  // called when a Cell is clicked
  _updateBoard(rowIdx, colIdx, val){
    const newBoard = this.state.board;
    const updatedState = val ? 1 : 0;
    newBoard[rowIdx][colIdx] = updatedState;
    this.setState({
      board: newBoard
    });
    // console.log(this.state.board);
  }

  // method to generate a new generation based on rules: need current this.state.board
  _getGen(arr){
    // console.log('generating new neighbourhood!');
    const newGen = this.state.board;
    const height = this.state.height;
    const width = this.state.width;
    const gen = this.state.generation + 1;

    // iterate nested array and apply rules to each cell
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
          let sum = 0;
          if(i-1 >= 0){
            sum += newGen[i-1][j];
          }
          if(j-1 >= 0){
            sum += newGen[i][j-1];
          }
          if(i-1 >= 0 && j-1 >= 0){
            sum += newGen[i-1][j-1];
          }
          if(i+1 < height){
            sum += newGen[i+1][j];
          }
          if(j+1 < width){
            sum += newGen[i][j+1];
          }
          if(i+1 < height && j+1 < width){
            sum += newGen[i+1][j+1];
          }
          if(i-1 >=0 && j+1 < width){
            sum += newGen[i-1][j+1];
          }
          if(i+1 < height && j-1 >= 0){
            sum += newGen[i+1][j-1];
          }

          if(newGen[i][j] === 0 && sum === 3){
            newGen[i][j] = 1;
          } else if(newGen[i][j] === 1 && (sum < 2)){
            newGen[i][j] = 0;
          } else if(newGen[i][j] === 1 && (sum === 2 || sum === 3)){
            newGen[i][j] = 1;
          } else if(newGen[i][j] === 1 && (sum > 3)){
            newGen[i][j] = 0;
          }
        }
      }

    this.setState({
      board: newGen,
      generation: gen
    });
    // console.log(this.state.board);
  }

  _resizeBoard(w, h){
    clearInterval(this.timerId);
    this.setState({
      width: w,
      height: h
    });
    console.log(w,h);
  }

  _runGame(){
    this.timerId = setInterval(() => this._getGen(), 1000);
  }

  _stopGame(){
    clearInterval(this.timerId);
    console.log('stop');
  }

  _clearGame(){
    console.log('clear');
    clearInterval(this.timerId);
    this.setState({
      generation:0
    });
    const boardCopy = [];
    for(let i = 0; i < this.state.height; i++){
      const row = [];
        for(let j = 0; j < this.state.width; j++){
          row.push(0);
        }
      boardCopy.push(row);
    }
    // update state with boardCopy
    this.setState({
      board: boardCopy,
    });
  }

  // render components
  render() {
    // control board size
    const w = this.state.width * 11;
    const h = this.state.height * 11;
    const boardSize = {
      width: w + 'px',
      height: h + 'px'
    }

    return (
      <div className="App">
        <h1>ReactJS Game of Life</h1>
        <ControlPanel
          generation={this.state.generation}
          runGame={this._runGame.bind(this)}
          stopGame={this._stopGame.bind(this)}
          clearGame={this._clearGame.bind(this)}
        />
        <div className="Board" style={boardSize}>
          {
            this.state.board.map((row, idx) => {
              return (
                <Row
                  key={idx}
                  rowIdx={idx}
                  row={row}
                  updateBoard={this._updateBoard.bind(this)}
                 />
              )
            })
          }
        </div>
        <SizePanel
          resizeBoard={this._resizeBoard.bind(this)}
        />
      </div>
    );
  }
}

export default App;
