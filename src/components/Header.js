import React, { Component } from 'react'
import Background from '../images/background.jpg'

const style = {
  backgroundImage: `url(${Background})`
}

export default class Header extends Component {
  render () {
    return (
      <header style={style}>
        <h1>Terminal.ink Bot List</h1>
        <h2>A very progressive bot list, made for the modern web.</h2>
      </header>
    )
  }
}
