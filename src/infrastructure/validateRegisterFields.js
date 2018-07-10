import observer from './observer'

export default function validateRegisterFields (username, pass, repeatPass) {
  if (!/^[A-Za-z]{3,}$/g.test(username)) {
    observer.trigger(observer.events.notification, { type: 'error', message: 'Username should be at least 3 characters long and contain only letters!' })
    return false
  }

  if (!/^[A-Za-z\d]{6,}$/.test(pass)) {
    observer.trigger(observer.events.notification, { type: 'error', message: 'Password should be at least 3 characters long and contain alphanumerical characters!' })
    return false
  }

  if (pass !== repeatPass) {
    observer.trigger(observer.events.notification, { type: 'error', message: 'Passwords should match!' })
    return false
  }

  return true
}
