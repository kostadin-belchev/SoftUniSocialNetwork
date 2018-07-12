import React, { Component } from 'react'
import calcTime from '../../infrastructure/calcTime'

class Comment extends Component {
  render () {
    // console.log('Comment props: ')
    // console.log(this.props)
    let comment = this.props
    // comment.isDeletable = false
    let deleteLink
    // eslint-disable-next-line
    if (comment._acl.creator === sessionStorage.getItem('userId')) {
      // comment.isDeletable = true
      deleteLink = <a onClick={(e) => this.props.onDelete(comment._id, e)} className='btn btn-primary btn-xs'>delete</a>
    }
    return (
      <div className='media'>
        <p className='pull-right'><small>{calcTime(comment)} ago</small></p>
        <div className='media-body'>
          <h4 className='media-heading user_name'>{comment.author}</h4>
          {comment.content}
          <p><small>{deleteLink}</small></p>
        </div>
      </div>
    )
  }
}

export default Comment

/* <div className='comment'>
  <article className='comment comment-content'>
    <p>{comment.content}</p>
    <div className='info'>
        submitted {calcTime(comment)} ago by {comment.author}{deleteLink ? ' | ' : null}{deleteLink}
    </div>
  </article>
</div> */
