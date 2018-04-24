import React, { Component } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import MonacoEditor from 'react-monaco-editor'
import 'monaco-editor'
import ImageDrag from './../components/ImageDrag'
import Loading from './../components/Loading'
import ErrorBox from './../components/ErrorBox'

import config from './../config/index.js'

export default class ViewBot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bot: null,
      errors: [],
      fatal: null
    }
  }

  componentWillMount () {
    const bot = this.props.match.params.id

    if (bot === 'new') {
      this.setState({
        bot: {},
        new: true
      })
    } else {
      fetch(`${config.API_URI}bots/id/${this.props.match.params.id}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) return data
          throw new Error(data.message)
        })
        .then(data => this.setState({
          bot: data.bot,
          new: false
        }))
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
  }

  render () {
    const bot = this.state.bot
    const errors = this.state.errors
    const fatal = this.state.fatal

    if (bot) {
      return (
        <main>
          <h1>{bot.name}</h1>
          { errors }
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

ViewBot.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
}
