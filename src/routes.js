import Home from './Home'
import ReadMeApp from './ReadMe'
import Todos from './Todos'

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
  }
]
