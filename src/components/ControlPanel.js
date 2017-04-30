import React, { Component } from 'react';

class ControlPanel extends Component {

  render() {
    return (

      <div className="Panel">
        <input type="button" value="Run"

        />
        <input type="button" value="Pause" onClick={this.props.stopGen}/>
        <input type="button" value="Clear" />
        <span>Generation: {this.props.generation}</span>
      </div>

    );
  }
}

export default ControlPanel;
