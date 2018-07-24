import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class CreateRoomButton extends Component {
  render() {
    return (
      <div className="CreateRoomButton">
        <button ahref="http://localhost:8080/auth/google" />
      </div>
    );
  }
}

export default hot(module)(CreateRoomButton);
