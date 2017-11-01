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
            length: 10,
            intensity: 'neutral'
          },
          {
            id: 1,
            name: 'Toy dealer',
            artist: 'Fuku6',
            file: 'test2.mp3',
            length: 180,
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
      console.log(nextTrackIndex);
      this.setState({playingIndex: nextTrackIndex})
      this.nextTrackLoaded();
      this.loadStartTrack(this.state.statePlaylist.tracks[nextTrackIndex].file, nextTrackIndex);
    }
  }

  nextTrackLoaded() {
    this.props.nextTrackLoaded();
  }

  loadStartTrack(track, index) {
    this.setState({playingIndex: index});
    this.props.loadStartTrack(track);
  }

  changeIntensity(index){
    let intensities = this.props.intensities,
        nextIntensity = intensities.indexOf(this.state.statePlaylist.tracks[index].intensity)+1,
        statePlaylist = this.state.statePlaylist;
        if(nextIntensity == intensities.length) {
          nextIntensity = 0;
        }
        statePlaylist.tracks[index].intensity = intensities[nextIntensity];
    this.setState({statePlaylist})
  }

  render() {
    return (
      <div className="playlist">
        {this.state.statePlaylist.tracks.map((item, index)=>{
          return <div className={`playlist__item ${index == this.state.playingIndex ? 'active':''}`} key={index}>
            <div onClick={()=>{this.loadStartTrack(item.file, index)}} className="playlist__item__play">
              <IconPlay />
            </div>
            <div className="playlist__item__left">
              <div className="playlist__item__intensity" onClick={()=>{this.changeIntensity(index)}}>
                {item.intensity}
              </div>
            </div>
            <div className="playlist__item__name">{item.artist} - {item.name}</div>
            <div className="playlist__item__right">

            </div>
          </div>
        })}
      </div>
    );
  }
}

export default Playlist;
