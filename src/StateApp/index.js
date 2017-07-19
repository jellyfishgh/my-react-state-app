import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../store/action-creators'

class StateHome extends Component {
  onTimeButtonClick(delay) {
    this.props.dispatch(actionCreators.getTime(delay))
  }
  render() {
    var { frozen, time, reduxState } = this.props
    var attrs = {}
    const DELAY = 5000
    if (frozen) {
      attrs = {
        disabled: true
      }
    }
    return (
      <div>
        <h1>Provider and connect example</h1>
        <span>
          <b>What time is it?</b>{' '}
          {time ? `It is currently ${time}` : 'No idea yet...'}
        </span>
        <br /> <br />
        <i>
          When clicking the button below, the time will be provided after a{' '}
          {DELAY}ms delay.
        </i>
        <br />
        <button {...attrs} onClick={() => this.onTimeButtonClick(DELAY)}>
          Get time!
        </button>
        <pre>redux state = {JSON.stringify(reduxState, null, 2)}</pre>
      </div>
    )
  }
}

export default connect((state /*, props*/) => {
  const { _time } = state
  const { frozen, time } = _time
  return {
    frozen,
    time,
    reduxState: state
  }
})(StateHome)
