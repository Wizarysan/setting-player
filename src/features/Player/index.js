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
      nextTrack: false,
      isPaused: false,
    }
  }

  loadStartTrack(trackName) {
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
      this.player.play();
      this.player.onended = () =>{
        console.log('ended');
        this.setState({nextTrack: true});
      }
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

  nextTrackLoaded(){
    this.setState({nextTrack: false});
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
        <Playlist
          loadStartTrack={this.loadStartTrack.bind(this)}
          nextTrackLoaded={this.nextTrackLoaded.bind(this)}
          nextTrack={this.state.nextTrack} />
      </div>
    );
  }
}

export default Player;
