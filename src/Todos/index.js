import React, { Component } from 'react'

import UpdateBlocker from '../common/UpdateBlocker'
import TodoApp, { links } from './TodoApp'

export default class Todos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.initType(props)
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      type: this.initType(nextProps)
    })
  }
  initType(props) {
    let {type} = props.match.params
    const toArray = links.map(({to}) => to)
    const index = toArray.findIndex((ele) => ele === type)
    if (index === -1)
      type = toArray[0]
    return type
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (!this.props.match.params.type) || (this.initType(this.props) !== this.initType(nextProps))
  }
  render() {
    const {type} = this.state
    return (
      <UpdateBlocker>
        <TodoApp type={ type } />
      </UpdateBlocker>
    )
  }
}
