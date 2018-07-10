export default function isUserLoggedIn () {
  // eslint-disable-next-line
  if (sessionStorage.getItem('authtoken') && sessionStorage.getItem('username') && sessionStorage.getItem('userId')) {
    return true
  } else {
    return false
  }
}
