import http from '../http'
import { GET_TIME, GET_PATHS } from './types'

export const getTime = delay => ({
  types: Object.keys(GET_TIME),
  promise: () =>
    new Promise(resolve => {
      setTimeout(() => {
        const d = new Date()
        const ms = `000${d.getMilliseconds()}`.slice(-3)
        resolve({
          time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
        })
      }, delay)
    })
})

export const getPaths = () => ({
  types: Object.keys(GET_PATHS),
  promise: () =>
    new Promise(resolve => {
      http.post({
        url: 'routes',
        success(paths) {
          resolve({ paths })
        }
      })
    })
})
