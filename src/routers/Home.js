import React, { Component } from 'react'
import LinkButton from './../components/LinkButton'
import BotStrip from './../components/BotStrip'
import ImageStrip from './../components/ImageStrip'

export default class Main extends Component {
  render () {
    return (
      <main>
        <ImageStrip />
        <BotStrip>Cool bots</BotStrip>
        <LinkButton to="/bots" colour="blue">View all bots</LinkButton>
      </main>
    )
  }
}
