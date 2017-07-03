// @flow

import React, { Component } from 'react'

import { ENTER_KEY, ESCAPE_KEY } from './config'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editText: props.label
    }
    this.initEditText = this.initEditText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  handleSubmit(e) {
    let {editText} = this.state
    const {deleteItem, index, changeTodoItem} = this.props
    editText = editText.trim()
    if (editText) {
      changeTodoItem(index, editText)
    } else {
      deleteItem(index)
    }
  }
  handleChange(e) {
    if (this.props.editing) {
      this.setState({
        editText: e.target.value
      })
    }
  }
  handleKeyDown(e) {
    const which = e.which
    if (which === ESCAPE_KEY) {
      this.props.cancelEdit()
      this.initEditText()
    } else if (which === ENTER_KEY) {
      this.handleSubmit(e)
    }
  }
  initEditText() {
    const {props} = this
    this.setState({
      editText: props.label
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.editing && this.props.editing) {
      const dom = this.editField
      dom.focus()
      dom.setSelectionRange(dom.value.length, dom.value.length)
    }
  }
  render() {
    const {label, deleteItem, id, completed, toggleItemCompleted, handleEdit, editing} = this.props
    const {editText} = this.state
    const {handleSubmit, handleChange, handleKeyDown} = this
    return (
      <li className={ [completed ? 'completed' : '', editing ? 'editing' : ''].join(' ').trim() }>
        <div className="view">
          <input className="toggle" type="checkbox" checked={ completed } onChange={ () => toggleItemCompleted(id) } />
          <label onDoubleClick={ () => handleEdit(id) }>
            { label }
          </label>
          <button className="destroy" onClick={ () => deleteItem(id) } />
        </div>
        <input ref={ input => this.editField = input } className="edit" value={ editText } onBlur={ handleSubmit } onChange={ handleChange } onKeyDown={ handleKeyDown }
        />
      </li>
    )
  }
}
