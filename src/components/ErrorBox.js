import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EmphasisBox from './EmphasisBox'
import LinkButton from './LinkButton'

export default class ErrorBox extends Component {
  render () {
    return (
      <div>
        <EmphasisBox colour="red">{this.props.children}</EmphasisBox>
        <p>
          <LinkButton colour="blue" to="/">Home</LinkButton>
        </p>
      </div>
    )
  }
}

ErrorBox.propTypes = {
  colour: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.children])
}
