import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import data from '../dummy.js';
import Login from './Login.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default hot(module)(App);
// export default App;
