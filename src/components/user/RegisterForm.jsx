import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import validateRegisterFields from '../../infrastructure/validateRegisterFields'
import saveSession from './../../infrastructure/saveSession'
import observer from '../../infrastructure/observer'
// import BoundForm from '../helpers/BoundForm'

class RegisterForm extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: '',
      repeatPass: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    this.setState({ [fieldName]: fieldValue })
  }

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
      this.props.history.push('/wall')
    }).catch((response) => {
      // trigger the observer so we can show a notification in case of unsuccessful login
      observer.trigger(observer.events.notification, { type: 'error', message: response.responseJSON.description })
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Create new account</h2>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Username</label>
          <input type='text' name='username' className='form-control' aria-describedby='emailHelp' placeholder='Enter username' onChange={this.handleChange} value={this.state.username} />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input name='password' type='password' className='form-control' placeholder='Password' onChange={this.handleChange} value={this.state.password} />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Repeat Password</label>
          <input name='repeatPass' type='password' className='form-control' placeholder='Repeat Password' onChange={this.handleChange} value={this.state.repeatPass} />
        </div>
        <button type='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    )
  }
}

export default RegisterForm
