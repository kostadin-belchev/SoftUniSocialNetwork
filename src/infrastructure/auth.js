import requester from './requester'
// user/login
function login (username, password) {
  let userData = {
    username,
    password
  }

  return requester.post('user', 'login', 'basic', userData)
}

// user/register
function register (username, password) {
  let userData = {
    username,
    password
  }

  return requester.post('user', '', 'basic', userData)
}

// user/logout
function logout () {
  let logoutData = {
    // eslint-disable-next-line
    authtoken: sessionStorage.getItem('authtoken')
  }

  return requester.post('user', '_logout', 'kinvey', logoutData)
}

export default {
  login,
  register,
  logout
}
