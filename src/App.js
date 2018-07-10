import React, { Component } from 'react'

// imports from app itself
import NavigationBar from './components/common/NavigationBar'
import AppRouter from './AppRouter'
import Footer from './components/common/Footer'
import Notification from './components/common/Notification'

class App extends Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <AppRouter />
        <Footer />
        <Notification />
      </div>
    )
  }
}

export default App
