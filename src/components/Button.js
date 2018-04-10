import React, { Component } from 'react';

export class Button extends Component {
  render() {
    return (
      <a className={['button', this.props.colour].join(' ')} href={this.props.href}>{this.props.label}</a>
    );
  }
}
