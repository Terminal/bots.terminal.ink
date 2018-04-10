import React, { Component } from 'react'
import Button from './../components/Button'

export default class Main extends Component {
  render () {
    return (
      <main>
        <p>
          Hello mr user<br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button href="https://google.com/" colour="blue" label="Google" />
      </main>
    )
  }
}
