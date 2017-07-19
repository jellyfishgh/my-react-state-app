// @flow

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import routes, { basename } from './routes'
import Home from './Home'

export default class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router basename={basename}>
          <div className="container">
            <Redirect to={`/`} />
            <Route exact path="/" component={Home} />
            {routes.map(route => <Route key={route.path} {...route} />)}
          </div>
        </Router>
      </Provider>
    )
  }
}
