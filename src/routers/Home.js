import React, { Component } from 'react'
import LinkButton from './../components/LinkButton'
import BotStrip from './../components/BotStrip'
import ImageStrip from './../components/ImageStrip'
import ErrorBox from './../components/ErrorBox'
import Loading from './../components/Loading'

import config from './../config/index.js'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bots: null,
      fatal: null
    }
  }

  componentWillMount () {
    fetch(`${config.API_URI}bots/`, {
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
          <ImageStrip bots={bots}/>
          <BotStrip bots={bots}>Cool bots</BotStrip>
          <LinkButton to="/bots" colour="blue">View all bots</LinkButton>
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
