import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class UnderlineContainer extends Component {
  render () {
    return (
      <div className="underline-container">
        <div className="underline-content">
          <h2 className="underline-header">{this.props.header}</h2>
          {this.props.href ? <a className="underline-link" href={this.props.href}>{this.props.label}</a> : null}
          {this.props.to ? <Link className="underline-link" to={this.props.to}>{this.props.label}</Link> : null}
        </div>
        <hr />
        {this.props.children}
      </div>
    )
  }
}

UnderlineContainer.propTypes = {
  header: PropTypes.string,
  label: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
