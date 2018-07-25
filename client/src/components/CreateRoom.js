import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class CreateRoom extends Component {
  render() {
    let users = this.props.usersList;
    return (
      <div className="CreateRoom">
        <h1>Create Room</h1>
        <input
          type="text"
          placeholder="Room Name"
          onChange={this.props.handleChange}
        />
        <div id="userList">
          {users.map((element, index) => {
            return (
              <p
                id={'participantList-' + element}
                onClick={e => this.props.handleClick(e)}
              >
                {element}
              </p>
            );
          })}
        </div>
        <div id="participantList">
          {this.props.participantsList.map(element => {
            return (
              <p
                id={'usersList-' + element}
                onClick={e => this.props.handleClick(e)}
              >
                {element}
              </p>
            );
          })}{' '}
        </div>
        <button id="submitButton" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default hot(module)(CreateRoom);
