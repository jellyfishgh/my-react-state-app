// @flow

import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import uuidv1 from 'uuid/v1'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'
import TodoItem from './TodoItem'

const ENTER_KEY = 13

export default class Todos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      items: [],
      links: [
        {
          label: 'All',
          to: 'all'
        },
        {
          label: 'Active',
          to: 'active'
        },
        {
          label: 'Completed',
          to: 'completed'
        }
      ]
    }
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleItemCompleted = this.toggleItemCompleted.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.clearHandler = this.clearHandler.bind(this)
    this.toggleAllHandler = this.toggleAllHandler.bind(this)
  }
  addNewTodo(label) {
    const { items } = this.state
    items.push({
      id: uuidv1(),
      label,
      completed: false
    })
    this.setState({ items })
  }
  handleNewTodoKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) return
    e.preventDefault()
    let { newTodo } = this.state
    newTodo = newTodo.trim()
    if (newTodo) {
      this.addNewTodo(newTodo)
      this.setState({ newTodo: '' })
    }
  }
  handleInputChange(e) {
    this.setState({
      newTodo: e.target.value
    })
  }
  toggleItemCompleted(index) {
    const { items } = this.state
    items[index].completed = !items[index].completed
    this.setState({ items })
  }
  deleteItem(index) {
    const { items } = this.state
    items.splice(index, 1)
    this.setState({ items })
  }
  clearHandler() {
    const { items } = this.state
    this.setState({
      items: items.filter(item => !item.completed)
    })
  }
  toggleAllHandler(e) {
    const completed = e.target.checked
    const { items } = this.state
    this.setState({
      item: items.map(item => Object.assign(item, { completed }))
    })
  }
  render() {
    const { newTodo, items, links } = this.state
    const { url, filter = 'all' } = this.props.match
    const {
      handleNewTodoKeyDown,
      handleInputChange,
      toggleItemCompleted,
      deleteItem,
      clearHandler,
      toggleAllHandler
    } = this
    const activeCount = items.filter(item => !item.completed).length
    const completedCount = items.length - activeCount
    return (
      <div className="page">
        <Helmet>
          <title>Todos</title>
        </Helmet>
        <ScrollToTopOnMount />
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              value={newTodo}
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onKeyDown={handleNewTodoKeyDown}
              onChange={handleInputChange}
            />
          </header>
          {items &&
            items.length > 0 &&
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={activeCount === 0}
                onChange={toggleAllHandler}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <ul className="todo-list">
                {items.map((item, index) =>
                  <TodoItem
                    key={item.id}
                    {...item}
                    index={index}
                    toggleItemCompleted={toggleItemCompleted}
                    deleteItem={deleteItem}
                  />
                )}
              </ul>
            </section>}
          {items &&
            items.length > 0 &&
            <footer className="footer">
              <span className="todo-count">
                <strong>{activeCount}</strong> item{activeCount > 1 ? 's' : ''}{' '}
                left
              </span>
              <ul className="filters">
                {links.map(({ label, to }) =>
                  <li key={to}>
                    <NavLink
                      className={filter === to ? 'selected' : ''}
                      to={`${url}/${to}`}
                    >
                      {label}
                    </NavLink>
                  </li>
                )}
              </ul>
              {!!completedCount &&
                <button className="clear-completed" onClick={clearHandler}>
                  Clear completed
                </button>}
            </footer>}
        </section>
      </div>
    )
  }
}
