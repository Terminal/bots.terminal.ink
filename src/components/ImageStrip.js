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
      speed: 500,
      className: 'image-strip'
    }

    const className = [
      'image-strip-image'
    ].concat(this.props.className).join(' ')

    return (
      <Slider {...settings}>
        {this.props.items.map((item, i) => (
          <img className={className} src={config.CDN_URI + item.item + '.png'} key={i} alt={item.name}/>
        ))}
      </Slider>
    )
  }
}

ImageStrip.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.arrayOf(PropTypes.string)
}
