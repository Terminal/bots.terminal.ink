import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './sass/index.css'

import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'

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
        <ToastContainer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export default App
