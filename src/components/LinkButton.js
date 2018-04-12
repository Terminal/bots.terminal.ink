import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class LinkButton extends Component {
  render () {
    return (
      <Link className={['button', this.props.colour].join(' ')} to={this.props.to}>{this.props.children}</Link>
    )
  }
}

LinkButton.propTypes = {
  colour: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.string
}
