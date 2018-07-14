import React, { Component } from 'react'
import MyPostsListAdmin from '../post/MyPostsListAdmin'
// import PostForm from '../post/PostForm'
import postsService from '../../infrastructure/postsService'
import requester from '../../infrastructure/requester'
import auth from '../../infrastructure/auth'
import observer from '../../infrastructure/observer'

class AdminPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      usernameToPurge: '',
      usernameToRestore: ''
    }

    this.handleBanUser = this.handleBanUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRestore = this.handleChangeRestore.bind(this)
    this.handleRestoreUser = this.handleRestoreUser.bind(this)
    this.handleChangePurge = this.handleChangePurge.bind(this)
  }

  handleBanUser (event) {
    event.preventDefault()
    if (this.state.username === '') {
      observer.trigger(observer.events.notification, { type: 'error', message: 'If you want to ban a user you have to put in a username first.' })
      return
    }
    auth.getUser(`?query={"username":"${this.state.username}"}`).then((res) => {
      let userToBan = res[0]
      let userObj = { username: userToBan.username, id: userToBan._id }
      requester.post('appdata', 'bannedUsers', 'kinvey', userObj).then(() => {
        requester.remove('user', `${userToBan._id}`, 'master').then(() => {
          observer.trigger(observer.events.notification, { type: 'success', message: 'User banned from app.' })
          this.setState({ username: '' })
        }).catch(console.log)
      }).catch(console.log)
    }).catch(() => {
      observer.trigger(observer.events.notification, { type: 'error', message: 'User with such username does not exist or is already banned!' })
    })
  }

  handleDeleteUser (event) {
    event.preventDefault()
    if (this.state.usernameToPurge === '') {
      observer.trigger(observer.events.notification, { type: 'error', message: 'If you want to delete a user you have to put in a username first.' })
      return
    }
    auth.getUser(`?query={"username":"${this.state.usernameToPurge}"}`).then((res) => {
      let userToPurge = res[0]
      // console.log(userToBan)
      requester.remove('user', `${userToPurge._id}?hard=true`, 'master').then(() => {
        observer.trigger(observer.events.notification, { type: 'success', message: 'User purged from app, you can no longer restore him.' })
        this.setState({ usernameToPurge: '' })
      }).catch(console.log)
    }).catch(() => {
      observer.trigger(observer.events.notification, { type: 'error', message: 'User with such username does not exist!' })
    })
  }

  handleRestoreUser (event) {
    event.preventDefault()
    if (this.state.usernameToRestore === '') {
      observer.trigger(observer.events.notification, { type: 'error', message: 'If you want to restore a user you have to put in a username first.' })
      return
    }
    requester.get('appdata', `bannedUsers?query={"username":"${this.state.usernameToRestore}"}`, 'kinvey').then((res) => {
      let userToRestore = res[0]
      // console.log(userToRestore)
      let userIdToRestore = userToRestore.id
      requester.post('user', `${userIdToRestore}/_restore`, 'master').then(() => {
        observer.trigger(observer.events.notification, { type: 'success', message: 'User restored.' })
        requester.remove('appdata', `bannedUsers/${userToRestore._id}`, 'kinvey').then(() => {
          // observer.trigger(observer.events.notification, { type: 'success', message: 'User restored and removed from banned users list.' })
        }).catch(console.log)
        this.setState({ userToRestore: '' })
      }).catch(console.log)
    }).catch(() => {
      observer.trigger(observer.events.notification, { type: 'error', message: 'Banned user with such username does not exist or was permanently deleted!' })
    })
  }

  handleChange (event) {
    let username = event.target.value
    this.setState({ username })
  }

  handleChangePurge (event) {
    let usernameToPurge = event.target.value
    this.setState({ usernameToPurge })
  }

  handleChangeRestore (event) {
    let usernameToRestore = event.target.value
    this.setState({ usernameToRestore })
  }

  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-3 sidenav'>
            <div className='well'>
              <p>Admin Tools</p>
              <div className='well'>
                <form onSubmit={this.handleBanUser}>
                  <div className='form-group'>
                    <label htmlFor='username3'>Ban user from access to app</label>
                    <input type='text' className='form-control' id='username3' placeholder='Username of user to ban' name='username' value={this.state.username} onChange={this.handleChange} />
                  </div>
                  <button type='submit' className='btn btn-default'>Ban</button>
                </form>
              </div>
              <div className='well'>
                <form onSubmit={this.handleDeleteUser}>
                  <div className='form-group'>
                    <label htmlFor='username4'>Delete user permanently</label>
                    <input type='text' className='form-control' id='username4' placeholder='Username of user to delete' name='usernameToPurge' value={this.state.usernameToPurge} onChange={this.handleChangePurge} />
                  </div>
                  <strong>Are you sure you want to purge this user permanently?</strong>
                  <br />
                  <button type='submit' className='btn btn-danger'>Delete</button>
                </form>
              </div>
              <div className='well'>
                <form onSubmit={this.handleRestoreUser}>
                  <div className='form-group'>
                    <label htmlFor='username5'>Restore banned user</label>
                    <input type='text' className='form-control' id='username5' placeholder='Username of user to restore' name='usernameToRestore' value={this.state.usernameToRestore} onChange={this.handleChangeRestore} />
                  </div>
                  <button type='submit' className='btn btn-primary'>Restore</button>
                </form>
              </div>
            </div>
          </div>

          <div className='col-sm-7'>
            <div className='row'>
              <MyPostsListAdmin request={postsService.loadAllPosts} />
            </div>

          </div>

          <div className='col-sm-2 sidenav'>
            <div className='well'>
              <p>ADS</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminPanel
