import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BotCard from './BotCard'
// import { Link } from 'react-router-dom'

import config from './../config.json'

export default class BotList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bots: []
    }
  }

  componentDidMount () {
    const type = this.props.type || ''
    fetch(`${config.API_URI}bots/${type}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => this.setState({ bots: data }))
  }

  render () {
    const bots = [...this.state.bots, ...this.state.bots, ...this.state.bots] || []
    return (
      <section className="bot-cards">
        {bots.map((bot, i) => (
          <BotCard bot={bot} key={i}/>
        ))}
      </section>
    )
  }
}

BotList.propTypes = {
  type: PropTypes.string
}
