import logo from './logo.svg'
import './App.css'

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import DevTools from 'mobx-react-devtools'
import { Link } from 'react-router-dom'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'

import http from '../http'

export default class ReadMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    this.getData = this.getData.bind(this)
  }
  componentDidMount() {
    this.getData(this.props.id)
  }
  componentWillUpdate(nextProps, nextState) {
    nextProps.id !== this.props.id && this.getData(nextProps.id)
  }
  getData(id) {
    const me = this
    http.get({
      url: `mrsa/${id}`,
      success(data) {
        me.setState({
          data
        })
      }
    })
  }
  render() {
    const { data } = this.state
    const { id } = this.props
    return (
      <div className="page">
        <Helmet>
          <title>
            ReadMe{id ? `Detail-${id}` : ''}
          </title>
        </Helmet>
        <ScrollToTopOnMount />
        <DevTools />
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="App-intro">My React State App</div>
          {data instanceof Array
            ? <ul>
                {data.map((item, index) =>
                  <li key={`item${index}`}>
                    <Link to={`/readme/${index}`}>
                      {item}
                    </Link>
                  </li>
                )}
              </ul>
            : <p>
                {data}
              </p>}
        </div>
      </div>
    )
  }
}
