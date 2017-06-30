import React, {Component} from 'react'
import { Helmet } from 'react-helmet'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'

export default class Todos extends Component {
  render() {
    return (
      <div className="page">
        <Helmet>
          <title>Todos</title>
        </Helmet>
        <ScrollToTopOnMount />
        <div>todos</div>
      </div>
    )
  }
}
