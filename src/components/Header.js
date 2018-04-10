import React, { Component } from 'react';
import Background from '../images/background.jpg';

const style = {
  backgroundImage: `url(${Background})`
}

export class Header extends Component {
  render() {
    return (
      <header style={style}>
        <h1>Terminal.ink Bot List</h1>
        <h2>A progressive Discord Bot List (because ReactJS)</h2>
      </header>
    );
  }
}
