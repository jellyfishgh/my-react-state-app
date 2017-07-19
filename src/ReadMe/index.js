import React, { Component } from 'react'

import UpdateBlocker from '../common/UpdateBlocker'
import ReadMe from './ReadMe'

export default class ReadMeApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.initType(props)
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: this.initType(nextProps)
    })
  }
  initType(props) {
    let id = ''
    props.match && props.match.params && (id = props.match.params.id)
    return id
  }
  render() {
    const { id } = this.state
    return (
      <UpdateBlocker>
        <ReadMe id={id} />
      </UpdateBlocker>
    )
  }
}
