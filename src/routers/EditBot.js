import React, { Component } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import MonacoEditor from 'react-monaco-editor'
import 'monaco-editor'
import ImageDrag from './../components/ImageDrag'
import Loading from './../components/Loading'
import ErrorBox from './../components/ErrorBox'

import config from './../config/index.js'

export default class EditBot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldBot: null,
      newBot: null,
      new: true,
      editor: null,
      errors: [],
      fatal: null
    }

    this.handleEditorDidMount = this.handleEditorDidMount.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.imageEdit = this.imageEdit.bind(this)
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

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions () {
    if (this.state.editor) this.state.editor.layout()
  }

  handleEdit (e) {
    const target = e.target
    const name = target.name
    let value

    if (target.type === 'checkbox') {
      value = target.checked
    } else {
      value = target.value
    }

    this.setState((prevState) => ({
      newBot: Object.assign(prevState.newBot, {
        [name]: value || prevState.oldBot[name]
      })
    }))
  }

  descriptionEdit (newValue, e) {
    this.setState((prevState) => ({
      newBot: Object.assign(prevState.newBot, {
        description: newValue
      })
    }))
  }

  imageEdit (images) {
    this.setState((prevState) => ({
      newBot: Object.assign(prevState.newBot, {
        images: images.length > 0 ? images : prevState.oldBot.images
      })
    }))
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
    const fatal = this.state.fatal

    if (oldBot) {
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
            <label className="form-label" htmlFor="images">Preview Images</label>
            <ImageDrag items={oldBot.images} onChange={this.imageEdit} name="images"/>
            <button className='button green' type="submit">Submit</button>
          </div>
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

EditBot.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
}
