import React, { Component } from 'react';

class SizePanel extends Component {
  _handleSize(){

  }

  render() {
    return (
      <div className="Panel">
      Board Size:
        <input
          type="button"
          value="Size: 50x30"
          data-width="50"
          data-height="30"
          onClick={this._handleSize.bind(this)}
        />
        <input
          type="button"
          value="Size: 70x50"
          data-width="70"
          data-height="50"
          onClick={this._handleSize.bind(this)}
        />
        <input
          type="button"
          value="Size: 100x80"
          data-width="100"
          data-height="80"
          onClick={this._handleSize.bind(this)}
        />
      </div>
    );
  }
}

export default SizePanel;
