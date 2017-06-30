import Home from './Home'
import ReadMe from './ReadMe'
import Todos from './Todos'

export const basename = "mrsa"

export default [
  {
    path: '/home',
    component: Home,
    title: '首页'
  },
  {
    path: '/readme',
    component: ReadMe,
    title: '须知'
  },
  {
    path: '/todos',
    component: Todos,
    title: '待办事项'
  }
]
