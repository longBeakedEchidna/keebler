import React, { Component } from 'react';
import axios from 'axios';
import { hot } from 'react-hot-loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(e) {
    if (e.target.id === 'loginButton') {
      axios.get('http://localhost:8080/auth/google').then(response => {
        console.log('user login response', response);
      });
    }
  }

  render() {
    return (
      <div className="Login">
        <button
          id="loginButton"
          onClick={e => {
            this.handleClick(e);
          }}
        >
          Login With Google
        </button>
      </div>
    );
  }
}

export default hot(module)(Login);
