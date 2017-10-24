import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: new window.Audio(),
      track: '',
      isPause: false,
    }
  }

  componentDidMount() {
  }

  loadTrack() {
    fetch('/api/track')
    .then(function(response) {
      return response.blob();
    }).then(function(blob){
      this.state.player.src = window.URL.createObjectURL(blob);
      //player.playbackRate = 0.8;
      //this.state.player.play();
    }.bind(this))
  }

  startTrack() {
    this.state.player.play();
  }

  pauseTrack() {
    this.state.player.pause();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <span onClick={()=>{this.loadTrack()}}> Load </span>
        <span onClick={()=>{this.startTrack()}}> Start </span>
        <span onClick={()=>{this.pauseTrack()}}> Pause </span>
      </div>
    );
  }
}

export default App;
