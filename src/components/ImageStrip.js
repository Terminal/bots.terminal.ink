import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
// import { Link } from 'react-router-dom'

import config from './../config.json'

export default class ImageStrip extends Component {
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
    const bots = [...this.state.bots, ...this.state.bots, ...this.state.bots, ...this.state.bots, ...this.state.bots, ...this.state.bots] || []
    const settings = {
      dots: true,
      infinite: true,
      speed: 500
    }

    return (
      <Slider {...settings}>
        {bots.map((bot, i) => (
          <img src={config.CDN_URI + bot.banner + '.png'} key={i} alt={bot.name + "'s banner"}/>
        ))}
      </Slider>
    )
  }
}

ImageStrip.propTypes = {
  type: PropTypes.string
}
