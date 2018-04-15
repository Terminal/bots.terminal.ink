import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BotCard from './BotCard'
// import { Link } from 'react-router-dom'

export default class BotList extends Component {
  render () {
    return (
      <section className="bot-cards">
        {this.props.bots.map((bot, i) => (
          <BotCard bot={bot} key={i}/>
        ))}
      </section>
    )
  }
}

BotList.propTypes = {
  bots: PropTypes.arrayOf(PropTypes.object)
}
