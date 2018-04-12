import React, { Component } from 'react'
import Background from '../images/background.jpg'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import config from './../config.json'

const style = {
  backgroundImage: `url(${Background})`
}

export default class Header extends Component {
  render () {
    const user = this.props.user
    return (
      <header style={style}>
        <nav>
          <Link to="/">
            <h1>Terminal.ink Bot List</h1>
          </Link>
          <content>
            <Link to="/test">Test</Link>
            <Link to="/bots">All Bots</Link>
            {
              user
                ? ([
                  <a href="/test" key="0">{user.username}</a>,
                  <a href={`${config.API_URI}auth/logout`} key="1">Log out</a>
                ])
                : <a href={`${config.API_URI}auth`}>Log in</a>
            }
          </content>
        </nav>
        <div className="header-jumbotron">
          <h2>The bot list you don&apos;t fork whatsoever (please do not fork)</h2>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object
}
