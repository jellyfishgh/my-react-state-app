// @flow

import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import routes, { basename } from './routes'
import Home from './Home'

export default class App extends Component {
  render() {
    return (
      <Router basename={basename}>
        <div className="container">
          <Route exact path="/" component={Home} />
          {routes.map(route => <Route key={route.path} {...route}/>)}
        </div>
      </Router>
    )
  }
}
