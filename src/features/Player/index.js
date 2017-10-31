import React, { Component } from 'react';
import noUiSlider from 'nouislider';
import Playlist from './../Playlist';

import IconPlay from './../../svg/play'
import IconPause from './../../svg/pause'

import './../../../node_modules/nouislider/distribute/nouislider.min.css';
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

  componentDidMount() {
    let volumeSlider = document.getElementById('volume');
    noUiSlider.create(volumeSlider, {
    	start: 1,
      step: 0.02,
      direction: 'rtl',
    	orientation: 'vertical',
    	range: {
    		'min': 0,
    		'max': 1
    	}
    });
    volumeSlider.noUiSlider.on('update', ()=>{
    	this.player.volume = volumeSlider.noUiSlider.get()
    });
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
          <div className="controls__volume">
            <div id="volume"></div>
          </div>
          <div className="controls__buttons">
            <div onClick={()=>{this.startTrack()}} className="controls__button">
              <IconPlay />
            </div>
            <div onClick={()=>{this.pauseTrack()}} className="controls__button">
              <IconPause />
            </div>
          </div>
        </div>
        <Playlist
          loadStartTrack={this.loadStartTrack.bind(this)}
          nextTrackLoaded={this.nextTrackLoaded.bind(this)}
          intensities={['ambient', 'easy', 'neutral', 'intense', 'denpa']}
          nextTrack={this.state.nextTrack} />
      </div>
    );
  }
}

export default Player;
