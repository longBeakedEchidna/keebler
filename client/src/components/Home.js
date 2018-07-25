import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import SelectRoom from './SelectRoom.js';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <SelectRoom />
      </div>
    );
  }
}

export default hot(module)(Home);
