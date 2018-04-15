import React, { Component } from 'react'
import LinkButton from './../components/LinkButton'
import BotStrip from './../components/BotStrip'
import ImageStrip from './../components/ImageStrip'

import { toast } from 'react-toastify'
import config from './../config.json'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bots: []
    }
  }

  componentDidMount () {
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
        <ImageStrip bots={bots}/>
        <BotStrip bots={bots}>Cool bots</BotStrip>
        <LinkButton to="/bots" colour="blue">View all bots</LinkButton>
      </main>
    )
  }
}
