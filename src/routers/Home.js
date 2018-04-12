import React, { Component } from 'react'
import Button from './../components/Button'
import BotStrip from './../components/BotStrip'

export default class Main extends Component {
  render () {
    return (
      <main>
        <p>
          Welcome to the Terminal.ink Test Bot List<br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button href="https://google.com/" colour="blue" label="Google" />
        <BotStrip>Cool bots</BotStrip>
      </main>
    )
  }
}
