import React, { Component } from 'react'
import '../../styles/notFoundErrorPage.css'

class NotFoundRoute extends Component {
  constructor () {
    super()

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
            {/* h1(data-h1='400') 400 */}
            {/* p(data-p='BAD REQUEST') BAD REQUEST */}
            {/* h1(data-h1='401') 401 */}
            {/* p(data-p='UNAUTHORIZED') UNAUTHORIZED */}
            {/* h1(data-h1='403') 403 */}
            {/* p(data-p='FORBIDDEN') FORBIDDEN */}
            <h2 data-h1={404}>404</h2>
            <p data-p='NOT FOUND'>Page Not Found</p>
            <button onClick={this.handleClick}>&laquo; Go back</button>
            <br />
            {/* h1(data-h1='500') 500 */}
            {/* p(data-p='SERVER ERROR') SERVER ERROR */}
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundRoute
