import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {
  render () {
    return (
      <a className={['button', this.props.colour].join(' ')} href={this.props.href}>{this.props.label}</a>
    )
  }
}

Button.propTypes = {
  colour: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string
}
