import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './sass/index.css'
import Header from './components/Header'
import Footer from './components/Footer'

const apiURI = 'http://127.0.0.1:8080/'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    fetch(`${apiURI}auth/info`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => this.setState({ user: data }))
  }

  render () {
    return (
      <div className="App">
        <Header />
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
