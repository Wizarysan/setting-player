import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      track: '',
    }
  }

  componentDidMount() {

  }

  playSong() {
    let player = new window.Audio();

    fetch('/api/track')
    .then(function(response) {
      return response.blob();
    }).then(function(blob){
      player.src = window.URL.createObjectURL(blob);
      //player.playbackRate = 0.8;
      player.play();
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <span onClick={()=>{this.playSong()}}>test</span>

      </div>
    );
  }
}

export default App;
