import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from './App'

import Home from './routers/Home'
import Test from './routers/Test'

const apiURI = 'http://127.0.0.1:8080/'

class Routes extends Component {
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
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/test" component={Test} />
          </Switch>
        </App>
      </Router>
    )
  }
}

export default Routes
