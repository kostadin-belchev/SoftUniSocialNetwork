import React, { Component } from 'react'
import LoginForm from '../user/LoginForm'
import RegisterForm from '../user/RegisterForm'

class Welcome extends Component {
  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-2 sidenav' />
          {/* </div> */}
          <div className='col-sm-8 text-left'>
            <h1>Welcome to SoftUni Social Network</h1>
            <p>Share interesting posts and discuss great developer oriented content.</p>
            <hr />
            <h3>Our take on privacy</h3>
            <ul>
              <li>Sign in or sign up in a second.</li>
              <li>No real names required.</li>
              <li>Just use your username for posting and commenting.</li>
            </ul>
            <hr />
            <LoginForm {...this.props} />
            <hr />
            <RegisterForm {...this.props} />
            <hr />
          </div>
          <div className='col-sm-2 sidenav'>
            <div className='well'>
              <p>ADS</p>
            </div>
            <div className='well'>
              <p>ADS</p>
            </div>
            <div>
              <span>Useful links:</span>
              <br />
              <a target='_blanck' href='https://softuni.bg'>SoftUni.bg</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
