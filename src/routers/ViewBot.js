import React, { Component } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import 'monaco-editor'
import Loading from './../components/Loading'
import ErrorBox from './../components/ErrorBox'
import CategoryLabel from './../components/CategoryLabel'
import ImageStrip from './../components/ImageStrip'
import UnderlineContainer from './../components/UnderlineContainer'
import LinkButton from './../components/LinkButton'

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
      const owners = new Map(bot.owners)

      return (
        <div>
          <div className="page-container">
            <UnderlineContainer
              header="Buddons">
              <p>These tools will only visible (during dev)</p>
              <LinkButton to={'/edit/' + bot.id} colour="blue">Edit</LinkButton>
            </UnderlineContainer>
          </div>
          <main>
            <img className="bot-banner round" src={config.CDN_URI + bot.banner + '.png'} alt={'The banner image for ' + bot.name}/>
            <h1>{bot.name}</h1>
            { errors }
            <p>{bot.description}</p>
            <UnderlineContainer
              header="Images">
              <ImageStrip items={bot.images.map((image) => ({
                item: image,
                name: 'An image "' + image + '" for ' + bot.name
              }))}/>
            </UnderlineContainer>
            <UnderlineContainer
              header="Small Print">
              <ul className="left bot-small-print">
                <li>
                  Category: <CategoryLabel category={bot.category} />
                </li>
                <li>
                  Bot offered by: {[...owners.keys()].map(name => (
                    <span key={name}>{name}</span>
                  ))}
                </li>
              </ul>
            </UnderlineContainer>
          </main>
        </div>
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
