import React, { Component } from 'react'
import BotList from './../components/BotList'

export default class AllBots extends Component {
  render () {
    return (
      <main>
        <p>
          Welcome to the Terminal.ink Test Bot List<br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <BotList />
      </main>
    )
  }
}
