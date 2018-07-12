import React, { Component } from 'react'
import '../../styles/commentsList.css'
import Comment from './Comment'

class CommentList extends Component {
  render () {
    // console.log('this.props.comments: ')
    // console.log(this.props.comments)
    let commentNodes = this.props.comments.map((comment) => {
      return (
        <Comment {...comment} onDelete={this.props.deleteCommentFn} key={comment._id} />
      )
    })

    return (this.props.comments.length === 0
      ? (<div>
        <div className='page-header'>
          <h1><small className='pull-right'>{this.props.comments.length} comments</small> Comments </h1>
        </div>
      </div>)
      : (
        <div>
          <div className='page-header'>
            <h1><small className='pull-right'>{this.props.comments.length} comments</small> Comments </h1>
          </div>
          <div className='comments-list'>
            {commentNodes}
          </div>
        </div>
      )
    )
  }
}

export default CommentList

// <div className='comment-content' style={{fontStyle: 'italic'}}><p>(No comments yet)</p></div>
