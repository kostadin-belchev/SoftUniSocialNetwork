import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Welcome from './components/common/Welcome'
import NotFoundRoute from './components/common/NotFoundRoute'
import Logout from './components/user/Logout'
import Wall from './components/wall/Wall'
import MyProfile from './components/user/MyProfile'
import PostDetails from './components/post/PostDetails'
import EditPost from './components/post/EditPost'
import DeletePost from './components/post/DeletePost'
import AdminPanel from './components/wall/AdminPanel'
import { withAdminAuthorization } from './components/helpers/withAuthorization'

class AppRouter extends Component {
  render () {
    return (
      <div className='content'>
        <Switch>
          <Route path='/' exact component={Welcome} />
          <Route path='/logout' component={Logout} />
          <Route path='/wall' component={Wall} />
          <Route path='/myProfile' component={MyProfile} />
          <Route path='/deletePost/:id' component={DeletePost} />
          <Route path='/postDetails/:id' component={PostDetails} />
          <Route path='/editPost/:id' component={EditPost} />
          <Route path='/adminPanel' component={withAdminAuthorization(AdminPanel)} />
          <Route component={NotFoundRoute} />
        </Switch>
      </div>
    )
  }
}

export default AppRouter
