import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import data from '../dummy.js';

class DisplayMessages extends Component {
  render() {
    const allMessages = data.messages.filter(element => {
      return this.props.roomName === data.roomList[element.room];
    });
    console.log(allMessages);
    return (
      <div>
        <p>Room: {this.props.roomName}</p>
        {allMessages[0]
          ? allMessages.map(element => {
              return (
                <p>
                  {data.users[element.user]}:{element.message}
                </p>
              );
            })
          : ''}
      </div>
    );
  }
}

export default hot(module)(DisplayMessages);
