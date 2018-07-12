import React, { Component } from 'react'
import MyPostsList from '../post/MyPostsList'
import postsService from '../../infrastructure/postsService'
import auth from '../../infrastructure/auth'
import observer from '../../infrastructure/observer'

class MyProfile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        avatarUrl: 'http://web.richmond.k12.va.us/portals/14/assets/images/user-avatar-placeholder.png'
      },
      newAvatarUrl: ''
    }

    this.handleAvatarUrlChange = this.handleAvatarUrlChange.bind(this)
    this.handleAvatarUrlSubmit = this.handleAvatarUrlSubmit.bind(this)
  }

  componentDidMount () {
    // eslint-disable-next-line
    auth.getUser(sessionStorage.getItem('userId')).then((user) => {
      this.setState({ user })
    })
  }

  handleAvatarUrlSubmit (event) {
    event.preventDefault()
    // validations
    if (!this.state.newAvatarUrl.startsWith('http')) {
      observer.trigger(observer.events.notification, { type: 'error', message: 'URL should start with "http"!' })
      return
    }
    let newUserData = {
      // eslint-disable-next-line
      "avatarUrl": this.state.newAvatarUrl
    }
    auth.updateUser(this.state.user._id, newUserData).then((user) => {
      // console.log(user)
      observer.trigger(observer.events.notification, { type: 'success', message: 'Avatar picture changed!' })
      this.setState({ user })
    }).catch(console.log)
  }

  handleAvatarUrlChange (event) {
    let newAvatarUrl = event.target.value
    this.setState({ newAvatarUrl })
  }

  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-3 sidenav'>
            <div className='well'>
              <div className='panel-group' id='accordion'>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a data-toggle='collapse' data-parent='#accordion' href='#collapse1'>Profile</a>
                    </h4>
                  </div>
                  <div id='collapse1' className='panel-collapse collapse in'>
                    <div className='panel-body'>
                      <div className='well'>
                        <p><strong>{this.state.user.username}</strong></p>
                        <img src={this.state.user.avatarUrl} className='img-circle' height={65} width={65} alt='Avatar' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a data-toggle='collapse' data-parent='#accordion' href='#collapse2'>Edit Profile Picture</a>
                    </h4>
                  </div>
                  <div id='collapse2' className='panel-collapse collapse'>
                    <div className='panel-body'>
                      <form onSubmit={this.handleAvatarUrlSubmit}>
                        <div className='form-group'>
                          <label htmlFor='text123'>Avatar image URL</label>
                          <input type='text' name='avatarUrl' className='form-control' id='text123' onChange={this.handleAvatarUrlChange} value={this.state.user.avatarUrl} />
                        </div>
                        <button type='submit' className='btn btn-default'>Change</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a data-toggle='collapse' data-parent='#accordion' href='#collapse3'>Interests</a>
                    </h4>
                  </div>
                  <div id='collapse3' className='panel-collapse collapse'>
                    <div className='panel-body'>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className='col-sm-7 text-left'>
            <h2>Posts that you have published</h2>
            <hr />
            <MyPostsList request={postsService.loadOwnPosts} reqArguments={{arg1: window.sessionStorage.getItem('username')}} />
          </div>
          <div className='col-sm-2 sidenav'>
            <div className='well'>
              <p>ADS</p>
            </div>
            <div className='well'>
              <p>ADS</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyProfile
