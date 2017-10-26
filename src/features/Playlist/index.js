import React, { Component } from 'react';
import './playlist.css';

import IconPlay from './../../svg/play'

class Playlist extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  loadStartTrack(track) {
    this.props.loadTrack(track);
    this.props.startTrack();
  }

  render() {
    return (
      <div className="playlist">
        <div className="playlist__item">
          <div onClick={()=>{this.loadStartTrack('test.mp3')}} className="playlist__item__play">
            <IconPlay />
          </div>
          <div className="playlist__item__name">Color&Color - 緑　Last Love♥護ってあげたい ～ Seventh Heaven</div>
        </div>
        <div className="playlist__item">
          <div onClick={()=>{this.loadStartTrack('test2.mp3')}} className="playlist__item__play">
            <IconPlay />
          </div>
          <div className="playlist__item__name">Fuku6 - Toy dealer</div>
        </div>
      </div>
    );
  }
}

export default Playlist;
