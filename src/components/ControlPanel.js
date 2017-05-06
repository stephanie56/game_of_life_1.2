import React, { Component } from 'react';

class ControlPanel extends Component {

  render() {
    return (
      <div className="Panel">
        <input type="button" value="Run"
          onClick={this.props.runGame}
        />
        <input type="button" value="Pause"
          onClick={this.props.stopGame}
        />
        <input type="button" value="Clear"
         onClick={this.props.clearGame}
        />
        <span>Generation: {this.props.generation}</span>
      </div>

    );
  }
}

export default ControlPanel;
