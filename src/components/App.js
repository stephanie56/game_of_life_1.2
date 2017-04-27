import React, { Component } from 'react';
import Row from './Row';
import '../styles/App.css';

class App extends Component {
  // manage state
  constructor(){
    super();
    this.state = {
      width:5,
      height:5,
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
    newBoard[rowIdx][colIdx] = val;
    this.setState({
      board: newBoard
    });
    console.log(this.state.board);

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
        </div>
      </div>
    );
  }
}

export default App;
