import logo from './logo.svg'
import './App.css'

import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import DevTools from 'mobx-react-devtools'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'

export default class Readme extends Component {
  render() {
    return (
      <div className="page">
        <Helmet>
          <title>ReadMe</title>
        </Helmet>
        <ScrollToTopOnMount />
        <DevTools />
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="App-intro">My React State App</div>
        </div>
      </div>
    )
  }
}
