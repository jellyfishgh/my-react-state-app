import { GET_TIME, GET_PATHS } from './types'

export const _time = (state = {}, action) => {
  console.log(
    '_time reducer called with state ',
    JSON.stringify(state),
    ' and action ',
    JSON.stringify(action)
  )
  switch (action.type) {
    case GET_TIME.REQUEST:
      return {
        ...state,
        frozen: true
      }
    case GET_TIME.SUCCESS:
      return {
        ...state,
        time: action.result.time,
        frozen: false
      }
    case GET_TIME.FAILURE:
      return {
        ...state,
        frozen: false
      }
    default:
      return state
  }
}

export const _paths = (state = { paths: [] }, action) => {
  console.log(
    '_paths reducer called with state ',
    JSON.stringify(state),
    ' and action ',
    JSON.stringify(action)
  )
  switch (action.type) {
    case GET_PATHS.SUCCESS:
      console.log({
        ...state,
        paths: action.result.paths
      })
      return {
        ...state,
        paths: action.result.paths
      }
    default:
      return state
  }
}
