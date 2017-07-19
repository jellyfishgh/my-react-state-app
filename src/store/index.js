import {createStore,/** applyMiddleware,*/ combineReducers} from 'redux'

// import promiseMiddleware from './promise-middleware'

import * as reducers from './reducers'

export default data => {
  const reducer = combineReducers(reducers)
  // const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  // return finalCreateStore(reducer, data)
  return createStore(reducer, data)
}
