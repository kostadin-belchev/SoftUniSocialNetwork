import React, { Component } from 'react'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'
import CommentForm from '../comment/CommentForm'
import '../../styles/post.css'
import CommentList from '../comment/CommentList'
import commentsService from '../../infrastructure/commentsService'
import calcTime from '../../infrastructure/calcTime'

class PostDetails extends Component {
  constructor () {
    super()

    this.state = {
      post: { author: '', title: '', avatarUrl: 'http://web.richmond.k12.va.us/portals/14/assets/images/user-avatar-placeholder.png', content: '', _id: '' },
      comments: []
    }

    this.getPostDetailsFromServer = this.getPostDetailsFromServer.bind(this)
    this.deleteCommentFunc = this.deleteCommentFunc.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  deleteCommentFunc (id) {
    // Our application is now feature complete but it feels slow to have to wait for the request to complete before the comment we want to delete disappears from the list.
    // We can optimistically add this comment to the list to make the app feel faster.
    let comments = this.state.comments
    let index
    for (const comment of comments) {
      if (comment._id === id) {
        index = comments.indexOf(comment)
      }
    }
    if (index > -1) {
      comments.splice(index, 1)
    }
    let newComments = comments
    this.setState({ comments: newComments })
    // just for faster UI notifications
    observer.trigger(observer.events.notification, { type: 'success', message: 'Comment deleted.' })

    commentsService.deleteComment(id).then(() => {
      observer.trigger(observer.events.notification, { type: 'success', message: 'Comment deleted.' })
      let postId = this.props.match.params.id
      commentsService.loadAllCommentsInPost(postId).then((comments) => {
        this.setState({ comments })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  handleCommentSubmit (content) {
    // eslint-disable-next-line
    let author = sessionStorage.getItem('username')
    let postId = this.state.post._id
    observer.trigger(observer.events.notificationHide)
    // Our application is now feature complete but it feels slow to have to wait for the request to complete before your comment appears in the list.
    // We can optimistically add this comment to the list to make the app feel faster.
    let comments = this.state.comments
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    // eslint-disable-next-line
    let userId = sessionStorage.getItem('userId')
    let comment = {
      author,
      content,
      postId,
      _id: Date.now(),
      _acl: { creator: userId },
      _kmd: { ect: Date.now() }
    }
    let newComments = comments.concat([comment])
    this.setState({ comments: newComments })
    observer.trigger(observer.events.notification, { type: 'success', message: 'Comment created.' })
    commentsService.createComment(author, content, postId).then((res) => {
      // console.log('res: ')
      // console.log(res)
      commentsService.loadAllCommentsInPost(postId).then((comments) => {
        this.setState({ comments })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  getPostDetailsFromServer () {
    let postId = this.props.match.params.id
    let postPromise = postsService.loadPostById(postId)
    let commentsPromise = commentsService.loadAllCommentsInPost(postId)
    Promise.all([postPromise, commentsPromise])
      .then(([post, comments]) => {
        // putting some post properties
        post.isEditable = false
        // eslint-disable-next-line
        if (post._acl.creator === sessionStorage.getItem('userId')) {
          post.isEditable = true
        }
        post.timeAgoSubmitted = calcTime(post)
        this.setState({ post, comments })
      })
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.getPostDetailsFromServer()
    // authomatic update every X milliseconds
    // setInterval(this.getPostDetailsFromServer, 3000)
  }

  componentWillMount () {
    // eslint-disable-next-line
    let isLoggedIn = sessionStorage.getItem('authtoken')
    if (isLoggedIn) {
      // eslint-disable-next-line
      let username = sessionStorage.getItem('username')
      observer.trigger(observer.events.loginUser, username)
    }
  }

  render () {
    // console.log('state from render: ')
    // console.log(this.state.post)
    let commentsExist
    if (this.state.comments.length > 0) {
      commentsExist = true
    }
    let isEditableContent
    let isDeletableContent
    if (this.state.post.isEditable) {
      isEditableContent = <a className='btn btn-info btn-xs' href={`/editPost/${this.props.match.params.id}`}>edit</a>
      isDeletableContent = <a className='btn btn-danger btn-xs' href={`/deletePost/${this.props.match.params.id}`}>delete</a>
    }
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-2 sidenav' />
          <div className='col-sm-8 text-left'>
            <section id='viewComments'>
              <div className='row'>
                <div className='col-sm-3'>
                  <div className='well'>
                    <p><strong> {this.state.post.author === '' ? null : this.state.post.author}</strong></p>
                    <img src={this.state.post.avatarUrl} className='img-circle' height={55} width={55} alt='Avatar' />
                    <div className='info'>
                      <small>submitted this post {!this.state.post._kmd ? '...' : calcTime(this.state.post)} ago</small>
                    </div>
                  </div>
                </div>
                <div className='col-sm-9'>
                  <div className='well'>
                    <h2>
                      {this.state.post.title}
                    </h2>
                    <p>{this.state.post.content}</p>
                    <div className='controls'>
                      {isEditableContent}
                      {isDeletableContent}
                    </div>
                  </div>
                </div>
              </div>
              <CommentForm onCommentSubmit={this.handleCommentSubmit} postId={this.state.post._id} />
              {!commentsExist ? <hr /> : <CommentList deleteCommentFn={this.deleteCommentFunc} comments={this.state.comments} />}
            </section>
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

export default PostDetails
