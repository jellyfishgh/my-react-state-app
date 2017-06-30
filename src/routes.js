import Home from './Home'
import ReadMe from './ReadMe'
import Todos from './Todos'

export const basename = "mrsa"

export default [
  {
    path: '/home',
    to: '/home',
    component: Home,
    title: '首页'
  },
  {
    path: '/readme',
    to: '/readme',
    component: ReadMe,
    title: '须知'
  },
  {
    path: '/todos(/:filter)?',
    to: '/todos',
    component: Todos,
    title: '待办事项'
  }
]
