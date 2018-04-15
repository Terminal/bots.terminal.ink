import React, { Component } from 'react'
import BotList from './../components/BotList'

import { toast } from 'react-toastify'
import config from './../config.json'

export default class AllBots extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bots: []
    }
  }

  componentDidMount () {
    fetch(`${config.API_URI}bots/all`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) return data
        throw new Error(data.message)
      })
      .then(data => this.setState({ bots: data.bots }))
      .catch((error) => {
        if (error.message === 'Failed to fetch') {
          toast('A network error occured')
        } else {
          toast('An error occured: ' + error.message)
        }
      })
  }

  render () {
    const bots = this.state.bots
    return (
      <main>
        <p>
          Welcome to the Terminal.ink Test Bot List<br />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <BotList bots={bots}/>
      </main>
    )
  }
}
