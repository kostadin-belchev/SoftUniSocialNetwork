import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import '../../styles/notifications.css'

const DEFAULT_STATE = {
  type: '',
  message: '',
  hide: true
}

class Notification extends Component {
  constructor () {
    super()

    this.state = DEFAULT_STATE

    observer.subscribe(observer.events.notification, this.showNotification.bind(this))
    observer.subscribe(observer.events.notificationHide, this.hideNotification.bind(this))
    this.hideNotification = this.hideNotification.bind(this)
  }

  showNotification (data) {
    let message = data.message
    let type = data.type
    this.setState({ type, message, hide: false })
  }

  hideNotification () {
    this.setState(DEFAULT_STATE)
  }

  render () {
    let notificationClass
    let preMessage
    if (this.state.type === 'success') {
      notificationClass = 'alert alert-success alert-dismissible fade in'
      preMessage = 'Success!'
      // hide notification after 3 seconds
      setTimeout(this.hideNotification, 3000)
    } else if (this.state.type === 'error') {
      notificationClass = 'alert alert-danger alert-dismissible fade in'
      preMessage = 'Error!'
    } else if (this.state.type === 'loading') {
      notificationClass = 'alert alert-info alert-dismissible fade in'
      preMessage = 'Loading!'
    }
    return (this.state.hide
      ? null
      : (
        <div className={notificationClass} id='notifications'>
          <a href='' className='close' data-dismiss='alert' aria-label='close' onClick={this.hideNotification}>×</a>
          <strong>{preMessage}</strong> <span>{this.state.message}</span>
        </div>
      )
    )
  }
}

export default Notification

// (<div id='notifications' onClick={this.hideNotification}>
//         <div id={notificationId} className='notification'><span>{this.state.message}</span></div>
//       </div>)
