import React, { Component } from 'react'

class About extends Component {
  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-3 sidenav' />
          <div className='col-sm-4 text-left'>
            <h1>About SoftUni Social Network</h1>
            <p>SoftUni Social Network is the easy to use network for developers. It lets you register with only a username and password. If you wish after the initial sign up you can set up your profile picture and interests. The platform allows you to publish posts and then to comment on those posts. It also included an Admin panel for easier admin management of the content of the site.</p>
            <hr />
          </div>
          <div className='col-sm-3 sidenav' />
        </div>
      </div>
    )
  }
}

export default About
