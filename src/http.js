const apiPrefix = '/'

function checkStatus(response) {
  if (response.ok) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export function request(options) {
  const body = new FormData()
  if (options.data)
    for (let key in options.data) {
      body.append(key, options.data[key])
    }
  const requestOptions = {
    method: options.method,
    credentials: 'same-origin'
  }
  if (options.method === 'POST') requestOptions['body'] = body
  let url = apiPrefix + options.url
  fetch(url, requestOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      netSuccessHandler(json, options.success, options.fail)
    })
    .catch(error => {
      options.netFail && options.netFail(error)
    })
}

function netSuccessHandler(response, success, fail) {
  if (response.success) {
    success && success(response.data)
  } else {
    fail && fail(response)
  }
}

export default {
  post(options) {
    request(
      Object.assign(
        {
          method: 'POST'
        },
        options
      )
    )
  },
  get(options) {
    request(
      Object.assign(
        {
          method: 'GET'
        },
        options
      )
    )
  }
}
