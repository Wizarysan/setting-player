import React, { Component } from 'react';
import Playlist from './../Playlist';

import IconPlay from './../../svg/play'
import IconPause from './../../svg/pause'

import './player.css';

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
      console.log(this);
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
        <div className="controls">
          <div onClick={()=>{this.startTrack()}} className="controls__button">
            <IconPlay />
          </div>
          <div onClick={()=>{this.pauseTrack()}} className="controls__button">
            <IconPause />
          </div>
        </div>
        <Playlist loadTrack={this.loadTrack.bind(this)} startTrack={this.startTrack.bind(this)} />
      </div>
    );
  }
}

export default Player;
