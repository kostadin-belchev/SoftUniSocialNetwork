import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import observer from '../../infrastructure/observer'
import saveSession from './../../infrastructure/saveSession'
import '../../styles/site.css'

class LoginForm extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: ''
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
    // login user
    auth.login(this.state.username, this.state.password).then((response) => {
      console.log(response)
      // check if he is admin and if he is save it maybe in localStorage
      // trigger the observer so we can show a notification in case of successful login
      observer.trigger(observer.events.notification, { type: 'success', message: 'Login successful.' })
      saveSession(response)
      // if login succcessful clear the entry fields
      this.setState({ username: '', password: '' })
      // redirect to postWall after successful login
      this.props.history.push('/wall')
    }).catch((response) => {
      // trigger the observer so we can show a notification in case of unsuccessful login
      observer.trigger(observer.events.notification,
        { type: 'error', message: response.responseJSON.description })
    })
  }

  render () {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        {/* <label htmlFor='inlineFormInputName2'>Username</label> */}
        <br />
        <input type='text' name='username' className='form-control mb-2 mr-sm-2' placeholder='Username' onChange={this.handleChange} value={this.state.username} />
        {/* <label htmlFor='exampleInputPassword1'>Password</label> */}
        <div className='form-group'>
          <input type='password' name='password' className='form-control' placeholder='Password' onChange={this.handleChange} value={this.state.password} />
        </div>
        <button type='submit' className='btn btn-primary mb-2'>Log In</button>
      </form>
    )
  }
}

export default LoginForm
