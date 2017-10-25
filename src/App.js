import React, { Component } from 'react';
import Player from './features/Player';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title glitch" data-text="幻音楽">幻音楽</span>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Player />
      </div>
    );
  }
}

export default App;
