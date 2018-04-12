import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './sass/index.css'
import Header from './components/Header'
import Footer from './components/Footer'

import config from './config.json'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    fetch(`${config.API_URI}auth/info`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => this.setState({ user: data }))
  }

  render () {
    const user = this.state.user
    return (
      <div className="App">
        <Header user={user}/>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export default App
