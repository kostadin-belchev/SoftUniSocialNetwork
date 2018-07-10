import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Welcome from './components/common/Welcome'
import NotFoundRoute from './components/common/NotFoundRoute'

class AppRouter extends Component {
  render () {
    return (
      <div className='content'>
        <Switch>
          <Route path='/' exact component={Welcome} />
          {/* <Route path='/home' component={Home} /> */}
          <Route component={NotFoundRoute} />
        </Switch>
      </div>
    )
  }
}

export default AppRouter
