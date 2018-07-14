import React, { Component } from 'react'
import MyPostsList from '../post/MyPostsList'
import postsService from '../../infrastructure/postsService'
import auth from '../../infrastructure/auth'
import observer from '../../infrastructure/observer'
import '../../styles/wall.css'

class MyProfile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        interests: [],
        avatarUrl: 'http://web.richmond.k12.va.us/portals/14/assets/images/user-avatar-placeholder.png'
      },
      newAvatarUrl: '',
      newInterest: ''
    }
    // TODO when changing addInterest field the posts changed, maybe change the whole loadPosts, or own loasts and load all posts and delete the reserve from everywhere
    this.handleAvatarUrlChange = this.handleAvatarUrlChange.bind(this)
    this.handleAvatarUrlSubmit = this.handleAvatarUrlSubmit.bind(this)

    this.handleInterestChange = this.handleInterestChange.bind(this)
    this.handleInterestSubmit = this.handleInterestSubmit.bind(this)

    this.deleteInterest = this.deleteInterest.bind(this)
  }

  componentDidMount () {
    // eslint-disable-next-line
    auth.getUser(sessionStorage.getItem('userId')).then((user) => {
      this.setState({ user })
    })
  }

  deleteInterest (index) {
    let interests = this.state.user.interests
    interests.splice(index, 1)
    let newUserData = {
      // eslint-disable-next-line
      "avatarUrl": this.state.user.avatarUrl,
      // eslint-disable-next-line
      "interests": interests
    }
    auth.updateUser(this.state.user._id, newUserData).then((user) => {
      // console.log('response from handleAvatarUrlSubmit AFTER update of USER: ')
      // console.log(user)
      observer.trigger(observer.events.notification, { type: 'success', message: 'Interest removed!' })
      this.setState({ user })
      // console.log('state from handleAvatarUrlSubmit AFTER update of state: ')
      // console.log(this.state)
    }).catch(console.log)
  }

  handleAvatarUrlSubmit (event) {
    event.preventDefault()
    // validations
    if (!this.state.newAvatarUrl.startsWith('http')) {
      observer.trigger(observer.events.notification, { type: 'error', message: 'URL should start with "http"!' })
      return
    }
    // console.log('state from handleAvatarUrlSubmit: ')
    // console.log(this.state)
    let newUserData = {
      // eslint-disable-next-line
      "avatarUrl": this.state.newAvatarUrl,
      // eslint-disable-next-line
      "interests": this.state.user.interests
    }
    auth.updateUser(this.state.user._id, newUserData).then((user) => {
      // console.log('response from handleAvatarUrlSubmit AFTER update of USER: ')
      // console.log(user)
      observer.trigger(observer.events.notification, { type: 'success', message: 'Avatar picture changed!' })
      this.setState({ user })
      // console.log('state from handleAvatarUrlSubmit AFTER update of state: ')
      // console.log(this.state)
    }).catch(console.log)
  }

  handleAvatarUrlChange (event) {
    let newAvatarUrl = event.target.value
    this.setState({ newAvatarUrl })
  }

  handleInterestSubmit (event) {
    event.preventDefault()

    // validations
    if (this.state.newInterest === '') {
      observer.trigger(observer.events.notification, { type: 'error', message: 'Interest keywork field cannot be empty!' })
      return
    }
    // console.log('state from handleInterestSubmit: ')
    // console.log(this.state)
    let interestsArray = this.state.user.interests
    if (interestsArray === undefined) {
      interestsArray = []
    }

    let newInterestsArray = interestsArray.concat([this.state.newInterest.trim()])

    let newUserData = {
      // eslint-disable-next-line
      "avatarUrl": this.state.user.avatarUrl,
      // eslint-disable-next-line
      "interests": newInterestsArray
    }
    auth.updateUser(this.state.user._id, newUserData).then((user) => {
      // console.log(user)
      observer.trigger(observer.events.notification, { type: 'success', message: `Interest named ${this.state.newInterest} added to your profile!` })
      this.setState({ user, newInterest: '' })
    }).catch(console.log)
  }

  handleInterestChange (event) {
    let newInterest = event.target.value
    this.setState({ newInterest })
  }

  render () {
    let interests
    if (this.state.user.interests) {
      interests = this.state.user.interests.map((interest, index) => {
        return <span key={index} className='label label-default' onClick={(e) => this.deleteInterest(index, e)} >{interest}</span>
      })
    }

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
                        <div className='panel-body'>
                          <div>
                            {interests}
                          </div>
                        </div>
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
                          <input type='text' name='newAvatarUrl' className='form-control' id='text123' onChange={this.handleAvatarUrlChange} value={this.state.newAvatarUrl} />
                        </div>
                        <button type='submit' className='btn btn-primary'>Change</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a data-toggle='collapse' data-parent='#accordion' href='#collapse3'>Add Interests</a>
                    </h4>
                  </div>
                  <div id='collapse3' className='panel-collapse collapse'>
                    <div className='panel-body'>
                      <div>
                        <form className='px-4 py-3' onSubmit={this.handleInterestSubmit}>
                          <div className='form-group'>
                            <label htmlFor='exampleDropdownFormEmail1'>Add interest keyword</label>
                            <input type='text' name='newInterest' className='form-control' id='exampleDropdownFormEmail1' placeholder='e.g. JS, Node, Python...' onChange={this.handleInterestChange} value={this.state.newInterest} />
                          </div>
                          <button type='submit' className='btn btn-primary'>Add</button>
                        </form>
                        <div className='dropdown-divider' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>
                      <a data-toggle='collapse' data-parent='#accordion' href='#collapse4'>Delete Interests</a>
                    </h4>
                  </div>
                  <div id='collapse4' className='panel-collapse collapse'>
                    <div className='panel-body'>
                      <p>Click on interest to removed it</p>
                      <div>
                        {interests}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className='col-sm-7 text-left'>
            <h2>Posts that you have published</h2>
            <hr />
            <MyPostsList request={postsService.loadOwnPosts} reqArguments={{arg1: window.sessionStorage.getItem('username')}} interests={this.state.user.interests} />
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
