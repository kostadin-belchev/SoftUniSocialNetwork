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
    password,
    avatarUrl: 'http://web.richmond.k12.va.us/portals/14/assets/images/user-avatar-placeholder.png'
  }

  return requester.post('user', '', 'basic', userData)
}

// get user
function getUser (id) {
  return requester.get('user', id, 'kinvey')
}

// update user
function updateUser (id, data) {
  return requester.update('user', id, 'kinvey', data)
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
  getUser,
  updateUser,
  logout
}
