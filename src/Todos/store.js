export default (namespace, data) => {
  if(data) return window.localStorage.setItem(namespace, JSON.stringify(data))
  let store = window.localStorage.getItem(namespace)
  store = store ? JSON.parse(store) : []
  return store
}
