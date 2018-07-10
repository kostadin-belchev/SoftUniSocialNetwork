export default function saveSession (userInfo) {
  // eslint-disable-next-line
  sessionStorage.setItem('authtoken', userInfo._kmd.authtoken)
  // eslint-disable-next-line
  sessionStorage.setItem('username', userInfo.username)
  // eslint-disable-next-line
  sessionStorage.setItem('userId', userInfo._id)
}
