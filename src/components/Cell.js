import React, { Component } from 'react';

class Cell extends Component {
  // method
  _updateState(){
    this.props.updateBoard(this.props.rowIdx, this.props.colIdx, !this.props.cell);
  }

  render() {
    return (
      <div
        className={ this.props.cell ? "alive" : "dead" }
        onClick={this._updateState.bind(this)}
      ></div>
    );
  }
}

export default Cell;
