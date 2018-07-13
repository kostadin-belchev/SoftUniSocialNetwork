import React, { Component } from 'react'
import observer from '../../infrastructure/observer'

class PostForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }

    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let content = this.state.content.trim()
    let title = this.state.title
    // validate for empty post content or title
    if (title === '' || content === '') {
      observer.trigger(observer.events.notification, { type: 'error', message: 'Title or contents of the post cannot be empty!' })
      return
    }

    let post = {
      // eslint-disable-next-line
      title,
      content
    }

    this.props.onPostSubmit(post)
    // clear fields after validation has passed and we are about to submit a post
    this.setState({ content: '', title: '' })
  }

  handleContentChange (event) {
    let content = event.target.value
    this.setState({ content })
  }

  handleTitleChange (event) {
    let title = event.target.value
    this.setState({ title })
  }

  render () {
    // console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Title</label>
          <input type='text' className='form-control' id='exampleFormControlInput1' placeholder='Title of your post' onChange={this.handleTitleChange} value={this.state.title} />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlTextarea1'>Post contents</label>
          <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} placeholder='Write here what you want to share...' onChange={this.handleContentChange} value={this.state.content} />
        </div>
        <input value='Post' className='btn btn-primary mb-2' type='submit' />
      </form>
    )
  }
}

export default PostForm
