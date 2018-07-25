import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import data from '../dummy.js';

class DisplayParticipants extends Component {
  render() {
    let participants = data.fakeTable.filter(element => {
      return data.roomList[element.room] === this.props.roomName;
    });
    console.log(participants);
    return (
      <div>
        <h3>
          {this.props.roomName === ''
            ? 'no room selected'
            : this.props.roomName}
        </h3>
        {participants[0]
          ? participants[0].users.map(element => {
              return <p> {data.users[element]}</p>;
            })
          : ''}
      </div>
    );
  }
}

export default hot(module)(DisplayParticipants);
