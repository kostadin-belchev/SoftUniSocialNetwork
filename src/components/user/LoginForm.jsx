import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import observer from '../../infrastructure/observer'
import saveSession from './../../infrastructure/saveSession'
import BoundForm from '../helpers/BoundForm'

class LoginForm extends Component {
  handleSubmit (event) {
    event.preventDefault()
    // login user
    auth.login(this.state.username, this.state.password).then((response) => {
      console.log(response)
      // check if he is admin and if he is save it maybe in localStorage
      // trigger the observer so we can show a notification in case of successful login
      observer.trigger(observer.events.notification, { type: 'success', message: 'Login successful.' })
      saveSession(response)
      // if login succcessful clear the entry fields
      this.setState({ username: '', password: '' })
      // redirect to catalog after successful login
      this.props.history.push('/catalog')
    }).catch((response) => {
      // trigger the observer so we can show a notification in case of unsuccessful login
      observer.trigger(observer.events.notification,
        { type: 'error', message: response.responseJSON.description })
    })
  }

  render () {
    return (
      <div className='row'>
        <BoundForm onSubmit={this.handleSubmit} className='form-inline'>
          <div className='row'>
            <div className='col-sm-4'>
              <label>Username</label>
              <input name='username' type='text' className='form-control' />
            </div>
            <div className='col-sm-4'>
              <label>Password</label>
              <input name='password' type='password' className='form-control' />
            </div>
            <div className='col-sm-4' />
            <div className='col-sm-4'>
              <button id='btnLogin' type='submit' className='btn btn-default'>Log In</button>
            </div>
          </div>
        </BoundForm>
      </div>
    )
  }
}

export default LoginForm
