import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BotCard from './BotCard'
// import { Link } from 'react-router-dom'

export default class BotStrip extends Component {
  render () {
    return (
      <section className="bot-strip-container">
        <div className="bot-strip-tab">
          <div className="bot-strip-tab-content">
            <h1 className="bot-strip-tab-header">{this.props.children}</h1>
            <a className="bot-strip-tab-more" href="https://google.co.uk/">More</a>
          </div>
          <hr />
        </div>
        <div className="bot-strip">
          {this.props.bots.map((bot, i) => (
            <BotCard bot={bot} key={i}/>
          ))}
        </div>
      </section>
    )
  }
}

BotStrip.propTypes = {
  children: PropTypes.string,
  bots: PropTypes.arrayOf(PropTypes.object)
}
