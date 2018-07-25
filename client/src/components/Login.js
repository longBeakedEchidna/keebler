import React, { Component } from 'react';
import axios from 'axios';
import { hot } from 'react-hot-loader';
import Home from './Home.js';
import SignUp from './SignUp.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
  }

  handleClick(e) {
    if (e.target.id === 'loginButton') {
      // axios.get('http://localhost:8080/auth/google').then(response => {
      //   console.log('user login response', response);
      // });
      this.setState({ status: 'loggedIn' });
    }
    if (e.target.id === 'signUpButton') {
      this.setState({ status: 'signingIn' });
    }
  }

  render() {
    return (
      <div className="Login">
        {this.state.status === 'loggedIn' ? (
          <Home />
        ) : (
          <button
            id="loginButton"
            onClick={e => {
              this.handleClick(e);
            }}
          >
            Login With Google
          </button>
        )}
        {this.state.status === 'signingIn' ? (
          <SignUp />
        ) : (
          <button
            id="signUpButton"
            onClick={e => {
              this.handleClick(e);
            }}
          >
            Sign-Up
          </button>
        )}
      </div>
    );
  }
}

export default hot(module)(Login);
