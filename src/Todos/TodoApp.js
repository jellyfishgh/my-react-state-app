// @flow

import 'todomvc-app-css/index.css'

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import uuidv1 from 'uuid/v1'

import ScrollToTopOnMount from '../common/ScrollToTopOnMount'
import TodoItem from './TodoItem'

import { ENTER_KEY, STORAGE_KEY } from './config'
import store from './store'

export const links = [
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

export default class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      items: store(STORAGE_KEY),
      links,
      currentEditingId: ''
    }
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.changeTodoItem = this.changeTodoItem.bind(this)
    this.toggleItemCompleted = this.toggleItemCompleted.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.clearHandler = this.clearHandler.bind(this)
    this.toggleAllHandler = this.toggleAllHandler.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.saveTodos = this.saveTodos.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.filterItem = this.filterItem.bind(this)
  }
  addNewTodo(label) {
    const {items} = this.state
    items.push({
      id: uuidv1(),
      label,
      completed: false
    })
    this.saveTodos(items)
  }
  handleNewTodoKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) return
    e.preventDefault()
    let {newTodo} = this.state
    newTodo = newTodo.trim()
    if (newTodo) {
      this.addNewTodo(newTodo)
      this.setState({
        newTodo: ''
      })
    }
  }
  handleInputChange(e) {
    this.setState({
      newTodo: e.target.value
    })
  }
  changeTodoItem(index, val) {
    const {items} = this.state
    items[index].label = val
    this.saveTodos(items)
    this.cancelEdit()
  }
  cancelEdit() {
    this.setState({
      currentEditingId: ''
    })
  }
  toggleItemCompleted(key) {
    const {items} = this.state
    const index = items.findIndex(({id}) => id === key)
    items[index].completed = !items[index].completed
    this.saveTodos(items)
  }
  deleteItem(key) {
    const {items} = this.state
    this.saveTodos(items.filter(({id}) => id !== key))
  }
  clearHandler() {
    const {items} = this.state
    this.saveTodos(items.filter(item => !item.completed))
  }
  toggleAllHandler(e) {
    const completed = e.target.checked
    const {items} = this.state
    this.saveTodos(items.map(item => Object.assign(item, {
      completed
    })))
  }
  handleEdit(currentEditingId) {
    this.setState({
      currentEditingId
    })
  }
  saveTodos(items) {
    this.setState({
      items
    })
    store(STORAGE_KEY, items)
  }
  filterItem(item) {
    const {type} = this.props
    switch (type) {
      case links[1].to:
        return !item.completed
      case links[2].to:
        return item.completed
      default:
        return true
    }
  }
  render() {
    const {newTodo, items, links, currentEditingId} = this.state
    const {type} = this.props
    const {handleNewTodoKeyDown, handleInputChange, toggleItemCompleted, deleteItem, clearHandler, toggleAllHandler, handleEdit, changeTodoItem, cancelEdit, filterItem} = this
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
            <input value={ newTodo } type="text" className="new-todo" placeholder="What needs to be done?" autoFocus onKeyDown={ handleNewTodoKeyDown } onChange={ handleInputChange }
            />
          </header>
          { items &&
            items.length > 0 &&
            <section className="main">
              <input type="checkbox" id="toggle-all" className="toggle-all" checked={ activeCount === 0 } onChange={ toggleAllHandler } />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <ul className="todo-list">
                { items.filter(filterItem).map((item, index) => <TodoItem key={ item.id } {...item} index={ index } toggleItemCompleted={ toggleItemCompleted } deleteItem={ deleteItem } handleEdit={ handleEdit }
                                                                  editing={ item.id === currentEditingId } changeTodoItem={ changeTodoItem } cancelEdit={ cancelEdit } />
                  ) }
              </ul>
            </section> }
          { items &&
            items.length > 0 &&
            <footer className="footer">
              <span className="todo-count"><strong>{ activeCount }</strong> item{ activeCount > 1 ? 's' : '' }{ ' ' }left</span>
              <ul className="filters">
                { links.map(({label, to}) => <li key={ to }>
                                               <NavLink className={ type === to ? 'selected' : '' } to={ `/todos/${to}` }>
                                                 { label }
                                               </NavLink>
                                             </li>
                  ) }
              </ul>
              { !!completedCount &&
                <button className="clear-completed" onClick={ clearHandler }>
                  Clear completed
                </button> }
            </footer> }
        </section>
      </div>
    )
  }
}
