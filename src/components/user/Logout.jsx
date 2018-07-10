import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import { Redirect } from 'react-router-dom'
import observer from '../../infrastructure/observer.js'

class Logout extends Component {
  render () {
    auth.logout().then(() => {
      // eslint-disable-next-line
      sessionStorage.removeItem('authtoken')
      // eslint-disable-next-line
      sessionStorage.removeItem('userId')
      // eslint-disable-next-line
      sessionStorage.removeItem('username')
      // trigger the observer so we can show a notification in case of successful logout
      observer.trigger(observer.events.notification, { type: 'success', message: 'Logout successful.' })
    }).catch((response) => {
      // trigger the observer so we can show a notification in case of unsuccessful logout
      observer.trigger(observer.events.notification,
        { type: 'error', message: response.responseJSON.description })
    })

    return (
      <Redirect to='/' />
    )
  }
}

export default Logout
