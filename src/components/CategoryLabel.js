import React, { Component } from 'react'
import PropTypes from 'prop-types'
import category from './../helpers/categories.json'

export default class LinkButton extends Component {
  render () {
    return (
      <span className={'bot-category-' + this.props.category}>{category[this.props.category]}</span>
    )
  }
}

LinkButton.propTypes = {
  category: PropTypes.number
}
