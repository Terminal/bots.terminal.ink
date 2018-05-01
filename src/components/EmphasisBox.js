import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EmphasisBox extends Component {
  render () {
    return (
      <div className={['emphasis', this.props.colour].join(' ')}>
        {this.props.children}
      </div>
    )
  }
}

EmphasisBox.propTypes = {
  colour: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
