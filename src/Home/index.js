import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'

import routes from '../routes'

import http from '../http'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paths: []
    }
  }
  componentDidMount() {
    const me = this
    http.post({
      url: 'routes',
      success(paths) {
        me.setState({ paths })
      }
    })
  }
  render() {
    const { paths } = this.state
    return (
      <div className="page">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <ScrollToTopOnMount />
        <ul>
          {paths &&
            paths.length > 0 &&
            routes.map(({ title, path }, index) =>
              <li key={path}>
                <Link to={paths[index]}>
                  {title}
                </Link>
              </li>
            )}
        </ul>
      </div>
    )
  }
}
