import React, { Component } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import MonacoEditor from 'react-monaco-editor'
import 'monaco-editor'
import ImageDrag from './../components/ImageDrag.js'

import { toast } from 'react-toastify'
import config from './../config.json'

export default class EditBot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldBot: {},
      newBot: {},
      new: true,
      editor: null
    }

    this.handleEditorDidMount = this.handleEditorDidMount.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.descriptionEdit = this.descriptionEdit.bind(this)
  }

  componentWillMount () {
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

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions () {
    this.state.editor.layout()
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

  descriptionEdit (newValue, e) {
    const oldBot = this.state.oldBot
    const newBot = this.state.newBot

    newBot.description = newValue || oldBot.description

    this.setState({
      newBot
    })
  }

  handleEditorDidMount (editor) {
    this.setState({
      editor
    })
  }

  render () {
    const newBot = this.state.newBot
    const oldBot = this.state.oldBot
    const errors = this.state.errors
    return (
      <main>
        <h1>{newBot ? 'Add' : 'Edit'} an application</h1>
        { errors }
        <code><pre>{JSON.stringify(oldBot, null, 2)}</pre></code>
        <code><pre>{JSON.stringify(newBot, null, 2)}</pre></code>
        <div className="form-edit">
          <label className="form-label" htmlFor="id">Application ID</label>
          <input className="form-input" name="id" type="text" placeholder={oldBot.id} onChange={this.handleEdit}></input>
          <label className="form-label" htmlFor="name">Application Name</label>
          <input className="form-input" name="name" type="text" placeholder={oldBot.name} onChange={this.handleEdit}></input>
          <label className="form-label" htmlFor="description">Description (Press F1 in editor for options)</label>
          <MonacoEditor
            key={this.state.width}
            name="description"
            height="300"
            options={{
              wordWrap: true
            }}
            language="markdown"
            theme="vs-dark"
            defaultValue={oldBot.description}
            onChange={this.descriptionEdit}
            editorDidMount={this.handleEditorDidMount}
          />
          <label className="form-label" htmlFor="invite">Application Invite URL</label>
          <input className="form-input" name="invite" type="text" placeholder={oldBot.invite} onChange={this.handleEdit}></input>
          <label className="form-label" htmlFor="prefix">Bot Trigger Prefix</label>
          <input className="form-input" name="prefix" type="text" placeholder={oldBot.prefix} onChange={this.handleEdit}></input>
          { Array.isArray(oldBot.images) ? <ImageDrag items={oldBot.images} onChange={console.dir}/> : null }
          <button className='button green' type="submit">Submit</button>
        </div>
      </main>
    )
  }
}

EditBot.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
}
