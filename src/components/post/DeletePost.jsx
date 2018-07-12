import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import postsService from '../../infrastructure/postsService'
import observer from '../../infrastructure/observer'

class DeletePost extends Component {
  componentDidMount () {
    let postId = this.props.match.params.id
    postsService.loadPostById(postId).then((post) => {
      // eslint-disable-next-line
      if (post._acl.creator !== sessionStorage.getItem('userId')) {
        // trigger the observer so we can show a notification in case of user trying to delete post that was not created by him
        observer.trigger(observer.events.notification, { type: 'success', message: 'You can only delete your own posts' })
        this.props.history.push('/wall')
      }
    }).catch(err => console.log(err))
  }

  render () {
    let postId = this.props.match.params.id
    // console.log(postId)
    postsService.deletePost(postId).then(() => {
      // After successful post delete a notification message “Post deleted.” should be displayed and the catalog should be shown.
      observer.trigger(observer.events.notification, { type: 'success', message: 'Post deleted.' })
    }).catch(response => {
      console.log(response)
      // In case of error (e.g. Internet connection lost / unauthorized request / missing message), an error message should be displayed.
      observer.trigger(observer.events.notification, { type: 'error', message: response.responseJSON.description })
    })
    return (
      <Redirect to='/wall' />
    )
  }
}

export default DeletePost
