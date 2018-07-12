import React, { Component } from 'react'
import observer from '../../infrastructure/observer'

class CommentForm extends Component {
  constructor () {
    super()

    this.state = {
      content: ''
    }

    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let content = this.state.content.trim()
    // validate for empty comment
    if (!content) {
      observer.trigger(observer.events.notification, { type: 'error', message: 'Post content cannot be empty!' })
      return
    }

    this.props.onCommentSubmit(content)
    this.setState({ content: '' })
  }

  handleContentChange (event) {
    this.setState({ content: event.target.value })
    // or
    // const fieldName = event.target.name
    // const fieldValue = event.target.value
    // this.setState({ [fieldName]: fieldValue })
    // console.log(this.state)
  }

  render () {
    // console.log(this.props)
    return (
      <div className='post post-content'>
        <form onSubmit={this.handleSubmit}>
          <br />
          <div className='form-group'>
            <label htmlFor='exampleFormControlTextarea1'>Post Comment</label>
            <textarea className='form-control' id='exampleFormControlTextarea2' name='content' type='text' value={this.state.content} onChange={this.handleContentChange} placeholder='Write the comment content here...' />
          </div>
          <br />
          <input type='submit' defaultValue='Add Comment' className='btn btn-primary' />
        </form>
      </div>
    )
  }
}

export default CommentForm
