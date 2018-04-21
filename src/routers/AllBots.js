import React, { Component } from 'react'
import BotList from './../components/BotList'
import Loading from './../components/Loading'
import ErrorBox from './../components/ErrorBox'

import config from './../config.json'

export default class AllBots extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bots: null
    }
  }

  componentDidMount () {
    fetch(`${config.API_URI}bots`, {
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
          this.setState({
            fatal: 'A network error occured'
          })
        } else {
          this.setState({
            fatal: 'An error occured: ' + error.message
          })
        }
      })
  }

  render () {
    const bots = this.state.bots
    const fatal = this.state.fatal

    if (bots) {
      return (
        <main>
          <p>
            Welcome to the Terminal.ink Test Bot List<br />
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <BotList bots={bots}/>
        </main>
      )
    } else if (fatal) {
      return (
        <main>
          <ErrorBox colour="red">{fatal}</ErrorBox>
        </main>
      )
    } else {
      return (
        <main>
          <Loading />
        </main>
      )
    }
  }
}
