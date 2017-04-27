import React, { Component } from 'react';
import Row from './Row';
import '../styles/App.css';

class App extends Component {
  // manage state
  constructor(){
    super();
    this.state = {
      width:50,
      height:30,
      speed:1000,
      board:[],
    }
  }

  componentWillMount(){
    this._initBoard(this.state.width, this.state.height);
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
    console.log(this.state.board);
  }

  // method to generate a new generation based on rules: need current this.state.board
  _getGen(arr){
    console.log('generating new neighbourhood!');
    const newGen = this.state.board;
    const height = this.state.height;
    const width = this.state.width;

    // iterate nested array and apply rules to each cell
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
          if(i-1 >= 0 && i+1 < height && j-1 >= 0 && j+1 < width - 1){
            let top_l = newGen[i-1][j-1];
            let top = newGen[i-1][j];
            let top_r = newGen[i-1][j+1];
            let left = newGen[i][j-1];
            let right = newGen[i][j+1];
            let btm_l = newGen[i+1][j-1];
            let btm = newGen[i+1][j];
            let btm_r = newGen[i+1][j+1];
            let sum = top_l + top + top_r + left + right + btm_l + btm + btm_r;
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
      }

    this.setState({
      board: newGen,
    });
    // console.log(this.state.board);
  }

  // render components
  render() {
    // console.log(this.state.board);
    // const board = this.state.board;
    return (
      <div className="App">
        <div className="Board">
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
        <input type="button" value="new gen" onClick={this._getGen.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
