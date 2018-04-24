import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class BotCard extends Component {
  render () {
    return (
      <Link to={'/bot/' + this.props.bot.id}>
        <article className="bot-cards-card">
          <img className="bot-card-avatar" src={this.props.bot.avatar} alt={this.props.bot.name + "'s avatar"}/>
          <h1>{this.props.bot.name}</h1>
          <p>{this.props.bot.description}</p>
        </article>
      </Link>
    )
  }
}

BotCard.propTypes = {
  bot: PropTypes.object
}
