import React, { Component } from 'react';
import noUiSlider from 'nouislider';
import Playlist from './../Playlist';

import IconPlay from './../../svg/play'
import IconPause from './../../svg/pause'
import IconNext from './../../svg/next'

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
      seekbarSearching: false,
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

  loadStartTrack(trackName, trackLength) {
    clearInterval(this.progressInterval)
    let seekbar = document.getElementById('seekbar');
    if(seekbar.noUiSlider) {
      seekbar.noUiSlider.destroy();
    }
    noUiSlider.create(seekbar, {
      start: 0,
      animate: false,
      range: {
        'min': 0,
        'max': trackLength
      }
    });
    this.progressInterval = setInterval(()=>{
      if(this.state.seekbarSearching) return;
      console.log(this.player.currentTime);
      seekbar.noUiSlider.set(this.player.currentTime);
    }, 500);
    seekbar.noUiSlider.on('change', ()=>{
    	this.player.currentTime = seekbar.noUiSlider.get();
    });
    seekbar.noUiSlider.on('start', ()=>{
    	this.setState({seekbarSearching: true});
      console.log(seekbar.noUiSlider.get());
    });
    seekbar.noUiSlider.on('end', ()=>{
    	this.setState({seekbarSearching: false});
      console.log(seekbar.noUiSlider.get());
    });
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
      seekbar.noUiSlider.set(this.player.currentTime);
      this.player.onended = () =>{
        //this.setState({nextTrack: true});
        this.nextTrack();
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

  nextTrack() {
    this.setState({nextTrack: true});
  }

  nextTrackLoaded(){
    this.setState({nextTrack: false});
  }

  render() {
    return (
      <div className="player">
        <div className="controls__seekbar">
          <div id="seekbar"></div>
        </div>
        <div className="player__body">
          <div className="controls">
            <div className="controls__volume">
              <div id="volume"></div>
            </div>
            <div className="controls__buttons">
              <div onClick={()=>{this.startTrack()}} className="controls__button">
                <IconPlay />
              </div>
              <div onClick={()=>{this.pauseTrack()}} className={`controls__button ${this.state.isPaused ? 'active':''}`}>
                <IconPause />
              </div>
              <div onClick={()=>{this.nextTrack()}} className="controls__button">
                <IconNext />
              </div>
            </div>
          </div>
          <Playlist
            loadStartTrack={this.loadStartTrack.bind(this)}
            nextTrackLoaded={this.nextTrackLoaded.bind(this)}
            intensities={['ambient', 'easy', 'neutral', 'intense', 'denpa']}
            nextTrack={this.state.nextTrack} />
        </div>
      </div>
    );
  }
}

export default Player;
