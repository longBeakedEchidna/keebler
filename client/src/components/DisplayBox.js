import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class DisplayBox extends Component {
  render() {
    return (
      <div className="DisplayBox">
        <button ahref="http://localhost:8080/auth/google" />
      </div>
    );
  }
}

export default hot(module)(DisplayBox);
