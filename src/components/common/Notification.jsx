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
    // observer.subscribe(observer.events.notification, this.hideNotification.bind(this))
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
    let notificationId
    if (this.state.type === 'success') {
      notificationId = 'infoBox'
      // hide notification after 3 seconds
      setTimeout(this.hideNotification, 3000)
    } else if (this.state.type === 'error') {
      notificationId = 'errorBox'
    } else if (this.state.type === 'loading') {
      notificationId = 'loadingBox'
    }
    return (this.state.hide ? null
      : (<div id='notifications' onClick={this.hideNotification}>
        <div id={notificationId} className='notification'><span>{this.state.message}</span></div>
      </div>)
    )
  }
}

export default Notification
