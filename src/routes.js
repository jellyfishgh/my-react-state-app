import Home from './Home'
import ReadMeApp from './ReadMe'
import Todos from './Todos'
import StateApp from './StateApp'

export const basename = "mrsa"

export default [
  {
    path: '/home',
    component: Home,
    title: '首页'
  },
  {
    path: '/readme/:id?',
    component: ReadMeApp,
    title: '须知'
  },
  {
    path: '/todos/:type?',
    title: '待办事项',
    component: Todos
  },
  {
    path: '/state-app',
    title: 'redux 状态管理',
    component: StateApp
  }
]
