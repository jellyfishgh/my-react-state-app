// @flow

import React, { Component } from 'react'

export default class TodoItem extends Component {
  render() {
    const {
      label,
      value,
      deleteItem,
      index,
      id,
      completed,
      toggleItemCompleted
    } = this.props
    return (
      <li className={completed ? 'completed' : 'view'}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            id={id}
            onChange={() => toggleItemCompleted(index)}
          />
          <label htmlFor={id}>
            {label}
          </label>
          <button className="destroy" onClick={() => deleteItem(index)} />
        </div>
        <input className="edit" value={value} />
      </li>
    )
  }
}
