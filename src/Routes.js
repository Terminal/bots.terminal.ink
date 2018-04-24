import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from './App'

import Home from './routers/Home'
import Test from './routers/Test'
import AllBots from './routers/AllBots'
import EditBot from './routers/EditBot'
import NotFound from './routers/NotFound'
import ViewBot from './routers/ViewBot'

class Routes extends Component {
  render () {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/test" component={Test} />
            <Route path="/bots" component={AllBots} />
            <Route path="/bot/:id" component={ViewBot} />
            <Route path="/edit/:id" component={EditBot} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    )
  }
}

export default Routes
