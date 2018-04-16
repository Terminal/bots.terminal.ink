import React, { Component } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'

import { toast } from 'react-toastify'
import config from './../config.json'
import Bot from './../class/Bot'

export default class EditBot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldBot: {},
      newBot: {},
      new: true
    }

    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount () {
    const bot = this.props.match.params.id

    if (bot === 'new') {
      this.setState({
        oldBot: {},
        newBot: {},
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
          oldBot: data.bot,
          newBot: Object.assign({}, data.bot),
          new: false
        }))
        .catch((error) => {
          if (error.message === 'Failed to fetch') {
            toast('A network error occured')
          } else {
            toast('An error occured: ' + error.message)
          }
        })
    }
  }

  handleEdit (e) {
    const oldBot = this.state.oldBot
    const newBot = this.state.newBot
    const target = e.target
    const name = target.name
    let value

    if (target.type === 'checkbox') {
      value = target.checked
    } else if (target.value === '' || target.value === null) {
      value = oldBot[name]
    } else {
      value = target.value
    }

    newBot[name] = value

    this.setState({
      newBot
    })
  }

  render () {
    const newBot = this.state.newBot
    const oldBot = this.state.oldBot
    const errors = this.state.errors
    return (
      <main>
        {
          newBot
            ? <h1>Add a bot</h1>
            : <h1>Edit a bot</h1>
        }
        { errors }
        <code><pre>{JSON.stringify(oldBot, null, 2)}</pre></code>
        <code><pre>{JSON.stringify(newBot, null, 2)}</pre></code>
        <form>
          <input name="id" type="text" placeholder={oldBot.id} onChange={this.handleEdit}></input>
          <input name="name" type="text" placeholder={oldBot.name} onChange={this.handleEdit}></input>
        </form>
      </main>
    )
  }
}

EditBot.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
}
