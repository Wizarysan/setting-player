import React, { Component } from 'react';
import './playlist.css';

import IconPlay from './../../svg/play'

class Playlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playingIndex: 0,
      statePlaylist: {
        name: 'test playlist',
        tracks: [
          {
            id: 0,
            name: '緑Last Love♥護ってあげたい ～ Seventh Heaven',
            artist: 'Color&Color',
            file: 'test.mp3',
            intensity: 'neutral'
          },
          {
            id: 1,
            name: 'Toy dealer',
            artist: 'Fuku6',
            file: 'test2.mp3',
            intensity: 'neutral'
          },
        ],
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.nextTrack) {
      //TODO last track in playlist
      let nextTrackIndex = this.state.playingIndex + 1;
      this.setState({playingIndex: nextTrackIndex})
      this.nextTrackLoaded();
      this.loadStartTrack(this.state.statePlaylist.tracks[nextTrackIndex].file);
    }
  }

  nextTrackLoaded() {
    this.props.nextTrackLoaded();
  }

  loadStartTrack(track, index) {
    this.setState({playingIndex: index});
    this.props.loadStartTrack(track);
  }

  render() {
    return (
      <div className="playlist">
        <div className="playlist__item">
          <div onClick={()=>{this.loadStartTrack('test.mp3', 0)}} className="playlist__item__play">
            <IconPlay />
          </div>
          <div className="playlist__item__left">

          </div>
          <div className="playlist__item__name">Color&Color - 緑　Last Love♥護ってあげたい ～ Seventh Heaven</div>
          <div className="playlist__item__right">

          </div>
        </div>
        <div className="playlist__item">
          <div onClick={()=>{this.loadStartTrack('test2.mp3', 1)}} className="playlist__item__play">
            <IconPlay />
          </div>
          <div className="playlist__item__name">Fuku6 - Toy dealer</div>
        </div>
      </div>
    );
  }
}

export default Playlist;
