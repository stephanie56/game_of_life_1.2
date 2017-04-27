import React, { Component } from 'react';
import Cell from './Cell';

class Row extends Component {

  render() {
    return (
      <div>
        {
          this.props.row.map((cell, idx) => {
            return (
              <Cell
                key={idx}
                cell={cell}
                colIdx={idx}
                rowIdx={this.props.rowIdx}
              />
            )
          })
        }
      </div>
    );
  }
}

export default Row;
