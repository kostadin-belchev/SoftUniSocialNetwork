import React, { Component } from 'react'
import '../../styles/notFoundErrorPage.css'

class Unauthorized extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.history.goBack()
  }

  render () {
    return (
      <div className='content'>
        <div className='error-page'>
          <div>
            <h2 data-h1={401}>401</h2>
            <p data-p='UNAUTHORIZED'>UNAUTHORIZED</p>
            <strong>You are not authorized to access this page! Log in with necessary priviledges. E.g. Admin</strong>
            <br />
            <br />
            <button onClick={this.handleClick}>&laquo; Go back</button>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default Unauthorized
