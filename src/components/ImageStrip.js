import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
// import { Link } from 'react-router-dom'

import config from './../config/index.js'

export default class ImageStrip extends Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500
    }

    return (
      <Slider {...settings}>
        {this.props.bots.map((bot, i) => (
          <img src={config.CDN_URI + bot.banner + '.png'} key={i} alt={bot.name + "'s banner"}/>
        ))}
      </Slider>
    )
  }
}

ImageStrip.propTypes = {
  bots: PropTypes.arrayOf(PropTypes.object)
}
