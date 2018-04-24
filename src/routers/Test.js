import React, { Component } from 'react'
import Button from './../components/Button'

export default class Test extends Component {
  render () {
    return (
      <main>
        <h1>Introduction</h1>
        <p>
          This is a test page. Violin has been removed to save my eyes in VSC.
        </p>
        <Button href="https://youtu.be/qbw9fGx_1RU?t=354" colour="blue">Source</Button>
      </main>
    )
  }
}
