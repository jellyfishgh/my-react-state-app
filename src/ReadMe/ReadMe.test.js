import React from 'react'
import ReactDOM from 'react-dom'
import Readme from './index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Readme />, div)
})
