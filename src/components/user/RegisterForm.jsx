import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import validateRegisterFields from '../../infrastructure/validateRegisterFields'
import saveSession from './../../infrastructure/saveSession'
import observer from '../../infrastructure/observer'
import BoundForm from '../helpers/BoundForm'

class RegisterForm extends Component {
  handleSubmit (event) {
    event.preventDefault()
    // validate register fields
    if (!validateRegisterFields(this.state.username, this.state.password, this.state.repeatPass)) {
      return
    }
    // register user
    auth.register(this.state.username, this.state.password).then((response) => {
      // console.log(response)
      // trigger the observer so we can show a notification in case of successful registration
      observer.trigger(observer.events.notification, { type: 'success', message: 'User registration successful.' })
      saveSession(response)
      // if register succcessful clear the entry fields
      this.setState({ username: '', password: '', repeatPass: '' })
      // redirect to catalog after successful login
      this.props.history.push('/catalog')
    }).catch((response) => {
      // trigger the observer so we can show a notification in case of unsuccessful login
      observer.trigger(observer.events.notification, { type: 'error', message: response.responseJSON.description })
    })
  }

  render () {
    return (
      <div className='row'>
        <h2>Create a new account</h2>
        <BoundForm onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email address:</label>
            <input type='email' className='form-control' id='email' />
          </div>
          <div className='form-group'>
            <label htmlFor='pwd'>Password:</label>
            <input type='password' className='form-control' id='pwd' />
          </div>
          <div className='checkbox'>
            <label><input type='checkbox' /> Remember me</label>
          </div>
          <button type='submit' className='btn btn-default'>Submit</button>
        </BoundForm>
      </div>
    )
  }
}

export default RegisterForm
