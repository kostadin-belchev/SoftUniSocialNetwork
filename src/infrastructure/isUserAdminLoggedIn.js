const ADMIN_ROLE_ID = '8038d494-1867-470e-ad18-71f75a54352c'

export default function isUserAdminLoggedIn () {
  // eslint-disable-next-line
  let userRoles = sessionStorage.getItem('userRoles')
  // console.log(userRoles)
  // eslint-disable-next-line
  if (userRoles !== 'undefined' && sessionStorage.getItem('username') && sessionStorage.getItem('userId')) {
    // eslint-disable-next-line
    let userRolesObj = JSON.parse(sessionStorage.getItem('userRoles'))
    // console.log(roles)
    // eslint-disable-next-line
    for (const key in userRolesObj) {
      if (userRolesObj.hasOwnProperty(key)) {
        const value = userRolesObj[key]
        // console.log('value: ')
        // console.log(value)
        if (value === ADMIN_ROLE_ID) {
          // console.log('User is admin')
          return true
        }
      }
    }
  } else {
    return false
  }
}
