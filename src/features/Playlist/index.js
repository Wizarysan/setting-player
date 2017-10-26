import React, { Component } from 'react';
import './playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  loadTrack(track) {
    console.log(this.props.loadTrack);
    this.props.loadTrack(track);
  }

  render() {
    return (
      <div className="playlist">
        <div onClick={()=>{this.loadTrack('test.mp3')}} className="playlist__item">
          <div className="playlist__item__name">  Color&Color - 緑　Last Love♥護ってあげたい ～ Seventh Heaven</div>
        </div>
        <div onClick={()=>{this.loadTrack('test2.mp3')}} className="playlist__item">
          <div className="playlist__item__name">Fuku6 - Toy dealer</div>
        </div>
      </div>
    );
  }
}

export default Playlist;
