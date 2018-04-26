import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BotCard from './BotCard'
import UnderlineContainer from './UnderlineContainer'
// import { Link } from 'react-router-dom'

export default class BotStrip extends Component {
  render () {
    return (
      <UnderlineContainer
        header={this.props.header}
        label={this.props.label}
        to={this.props.to}
        href={this.props.href}>
        <div className="bot-strip">
          {this.props.bots.map((bot, i) => (
            <BotCard bot={bot} key={i}/>
          ))}
        </div>
      </UnderlineContainer>
    )
  }
}

BotStrip.propTypes = {
  header: PropTypes.string,
  label: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.string,
  bots: PropTypes.arrayOf(PropTypes.object)
}
