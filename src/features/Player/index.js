import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props)
    this.player = new window.Audio();
    this.state = {
      track: '',
      isPaused: false,
    }
  }

  loadTrack(trackName) {
    fetch('/api/track', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {track: trackName}
      )
    })
    .then(function(response) {
      return response.blob();
    }).then(function(blob){
      this.player.src = window.URL.createObjectURL(blob);
    }.bind(this))
  }

  startTrack() {
    this.player.play();
    this.setState({isPaused: false});
  }

  pauseTrack() {
    this.player.pause();
    this.setState({isPaused: true});
  }

  render() {
    return (
      <div className="player">
        <div onClick={()=>{this.loadTrack('test.mp3')}}> Load test </div>
        <div onClick={()=>{this.loadTrack('test2.mp3')}}> Load test 2 </div>
        <div onClick={()=>{this.startTrack()}}> Play </div>
        <div onClick={()=>{this.pauseTrack()}}> Pause </div>
      </div>
    );
  }
}

export default Player;
