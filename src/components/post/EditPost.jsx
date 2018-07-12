import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'

class EditPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        author: '',
        title: '',
        avatarUrl: '',
        content: ''
      }
    }

    this.onInputChanged = this.onInputChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    let postId = this.props.match.params.id
    postsService.loadPostById(postId).then((post) => {
      // eslint-disable-next-line
      if (post._acl.creator !== sessionStorage.getItem('userId')) {
        // trigger the observer so we can show a notification in case of user trying to edit post that was not created by him
        observer.trigger(observer.events.notification, { type: 'success', message: 'You can only edit your own posts' })
        this.props.history.push('/wall')
      }

      this.setState({
        form: post
      })
    }).catch(err => console.log(err))
  }

  onInputChanged (event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    const newState = {}
    newState[name] = value
    this.setState({
      form: Object.assign(this.state.form, newState)
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    // validations
    if (this.state.form.title === '' || this.state.form.content === '') {
      observer.trigger(observer.events.notification, { type: 'success', message: 'Title and/or content cannot be empty!' })
      return
    }

    let postId = this.props.match.params.id
    // // EXPERITMENT
    // let postId = this.state.form._id
    // postId, author, title, avatarUrl, content
    postsService.editPost(postId, this.state.form.author, this.state.form.title, this.state.form.avatarUrl, this.state.form.content)
      .then(() => {
        // trigger the observer so we can show a notification in case of successful post edit
        observer.trigger(observer.events.notification, { type: 'success', message: `Post ${this.state.form.title} updated.` })
        this.props.history.push('/wall')
      }).catch(err => console.log(err))
  }

  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-2 sidenav' />
          <div className='col-sm-8 text-left'>
            <section id='viewEdit'>
              <div className='submitArea'>
                <h1>Edit Post</h1>
                <p>After edditing the post please save the changes.</p>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='exampleFormControlInput1'>Title</label>
                  <input name='title' type='text' className='form-control' id='exampleFormControlInput1' onChange={this.onInputChanged} value={this.state.form.title} />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleFormControlTextarea1'>Post contents</label>
                  <textarea name='content' className='form-control' id='exampleFormControlTextarea1' rows={3} onChange={this.onInputChanged} value={this.state.form.content} />
                </div>
                <input value='Save' className='btn btn-primary mb-2' type='submit' />
              </form>
            </section>
            <hr />
          </div>
          <div className='col-sm-2 sidenav'>
            <div className='well'>
              <p>ADS</p>
            </div>
            <div className='well'>
              <p>ADS</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditPost
