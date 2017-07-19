import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'

import routes from '../routes'

import * as actionCreators from '../store/action-creators'

class Home extends Component {
  componentDidMount() {
    const {paths, dispatch} = this.props
    paths.length === 0 && dispatch(actionCreators.getPaths())
  }
  render() {
    const { paths } = this.props
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

export default connect(state => {
  return {
    paths: state._paths.paths
  }
})(Home)
