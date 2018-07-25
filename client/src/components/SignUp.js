import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import data from '../dummy.js';

class SignUp extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="User Name" />
        <input type="text" placeholder="Password" />
      </div>
    );
  }
}

export default hot(module)(SignUp);
