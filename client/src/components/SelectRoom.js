import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import CreateRoom from './CreateRoom';
import SwitchRoom from './SwitchRoom';
import axios from 'axios';
import data from '../dummy.js';
import DisplayParticipants from './DisplayParticipants';
import DisplayMessages from './DisplayMessages';

class SelectRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      roomName: '',
      participantList: [],
      usersList: data.users
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }

  handleClick(e) {
    let eventInformation = e.target.id.split('-');
    let eventType = eventInformation[0];
    let eventId = eventInformation[1];
    console.log(`EVENT TYPE ${eventType} id ${eventId}`);
    //eventInformation will consiste of Event Type && id of the element was clicked
    // console.log(e.target.id.split('-'));
    if (eventType === 'display') {
      if (eventId === this.state.display) {
        this.setState({ display: '' });
      } else {
        this.setState({ display: eventId });
      }
    } else {
      this.setState(currentState => {
        console.log(currentState);
        let popArray =
          eventType === 'participantList' ? 'usersList' : 'participantList';
        console.log('POPARRAY ', popArray);
        let indexOfElement = currentState[popArray].indexOf(eventId);
        console.log(`indexOfElement ${indexOfElement}`);
        console.log(currentState[eventType]);
        return {
          [eventType]: [].concat(currentState[eventType], [eventId]),
          [popArray]: [].concat(
            currentState[popArray].slice(0, indexOfElement),
            currentState[popArray].slice(indexOfElement + 1)
          )
        };
      });
    }
  }

  handleChange(e) {
    this.setState({ roomName: e.target.value });
  }

  handleRoomChange(e) {
    this.setState({ roomName: e.target.innerText });
  }

  handleSubmit() {
    axios.post('http://localhost:8080/createRoom', { data: 'data' });
  }

  render() {
    let display = this.state.display;
    return (
      <div className="SelectRoom">
        <div className="buttonContainer">
          <button
            id="display-createRoom"
            onClick={e => {
              this.handleClick(e);
            }}
          >
            Create Room
          </button>
          <button
            id="display-switchRoom"
            onClick={e => {
              this.handleClick(e);
            }}
          >
            Select Room
          </button>
        </div>
        <div className="roomContainer">
          {display === 'switchRoom' ? (
            <SwitchRoom handleRoomChange={this.handleRoomChange} />
          ) : display === 'createRoom' ? (
            <CreateRoom
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              participantsList={this.state.participantList}
              usersList={this.state.usersList}
            />
          ) : (
            ''
          )}
        </div>
        <DisplayParticipants roomName={this.state.roomName} />
      </div>
    );
  }
}

export default hot(module)(SelectRoom);
