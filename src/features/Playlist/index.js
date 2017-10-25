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
        <div onClick={()=>{this.loadTrack('test.mp3')}}> Load test </div>
        <div onClick={()=>{this.loadTrack('test2.mp3')}}> Load test 2 </div>
      </div>
    );
  }
}

export default Playlist;
