import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'

import routes from '../routes'

export default class Home extends Component {
  render() {
    return (
      <div className="page">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <ScrollToTopOnMount />
        <ul>
          {routes &&
            routes.map(({ to, title }) =>
              <li key={to}>
                <Link to={to}>
                  {title}
                </Link>
              </li>
            )}
        </ul>
      </div>
    )
  }
}
