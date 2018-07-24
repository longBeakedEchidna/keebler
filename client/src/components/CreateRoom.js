import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class CreateRoom extends Component {
  render() {
    return (
      <div className="CreateRoom">
        <button ahref="http://localhost:8080/auth/google" />
      </div>
    );
  }
}

export default hot(module)(CreateRoom);
