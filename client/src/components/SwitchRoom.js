import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import data from '../dummy.js';

class SwitchRoom extends Component {
  render() {
    return (
      <div className="SwitchRoom">
        {data.roomList.map(element => {
          return (
            <p
              id={'openRoom-' + element}
              onClick={e => this.props.handleRoomChange(e)}
            >
              {element}
            </p>
          );
        })}
      </div>
    );
  }
}

export default hot(module)(SwitchRoom);
