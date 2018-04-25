import React, { Component } from 'react'
import Background from '../images/background.jpg'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import config from './../config/index.js'

const style = {
  backgroundImage: `url(${Background})`
}

export default class Header extends Component {
  getLinks () {
    const user = this.props.user

    return (
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>
        <Link to="/bots">All Bots</Link>
        {
          user && user.username
            ? [
              <a href="/test" key={0}>{user.username}</a>,
              <a href={`${config.API_URI}auth/logout`} key={1}>Log out</a>
            ]
            : <a href={`${config.API_URI}auth`}>Log in</a>
        }
      </div>
    )
  }

  render () {
    return (
      <header style={style}>
        <nav>
          <Link to="/">
            <h1>Terminal.ink Bot List</h1>
          </Link>
        </nav>
        <div className="header-jumbotron">
          {this.getLinks()}
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object
}
