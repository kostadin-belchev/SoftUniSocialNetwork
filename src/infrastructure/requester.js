import $ from 'jquery'

const kinveyBaseUrl = 'https://baas.kinvey.com/'
const kinveyAppKey = 'kid_ryGfKcGXQ'
const kinveyAppSecret = '919c8245fe1f47c6a3f934f7b3322ea6'

// Creates the authentication header
function makeAuth (type) {
  return type === 'basic'
    // eslint-disable-next-line
    ? 'Basic ' + btoa (kinveyAppKey + ':' + kinveyAppSecret)
    // eslint-disable-next-line
    : 'Kinvey ' + sessionStorage.getItem('authtoken')
}

// Creates request object to kinvey
function makeRequest (method, module, endpoint, auth) {
  return {
    method,
    url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
    headers: {
      'Authorization': makeAuth(auth)
    }
  }
}

// Function to return GET promise
function get (module, endpoint, auth) {
  return $.ajax(makeRequest('GET', module, endpoint, auth))
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
  let req = makeRequest('POST', module, endpoint, auth)
  req.data = data
  return $.ajax(req)
}

// Function to return PUT promise
function update (module, endpoint, auth, data) {
  let req = makeRequest('PUT', module, endpoint, auth)
  req.data = data
  return $.ajax(req)
}

// Function to return DELETE promise
function remove (module, endpoint, auth) {
  return $.ajax(makeRequest('DELETE', module, endpoint, auth))
}

export default {
  get,
  post,
  update,
  remove
}
