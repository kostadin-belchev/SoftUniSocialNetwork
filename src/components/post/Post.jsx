import React, { Component } from 'react'
import calcTime from '../../infrastructure/calcTime'
import '../../styles/post.css'

class Post extends Component {
  render () {
    // console.log('this.props: ')
    // console.log(this.props)
    let interests
    // TODO, pass the interests to here and print them
    // if (this.props.interests) {
    //   interests = this.props.interests.map((interest, index) => {
    //     return <span key={index} className='label label-default'>{interest}</span>
    //   })
    // }

    let isEditableContent
    let isDeletableContent
    if (this.props.isEditable) {
      if (!this.props.onPostDelete) {
        // console.log('adds link')
        isDeletableContent = <a className='btn btn-danger btn-xs' href={`/deletePost/${this.props._id}`}>delete</a>
      } else {
        // console.log('adds function')
        // console.log(this.props._id)
        isDeletableContent = <a className='btn btn-danger btn-xs' onClick={(e) => this.props.onPostDelete(this.props._id, e)}>delete</a>
      }
      isEditableContent = <a className='btn btn-info btn-xs' href={`/editPost/${this.props._id}`}>edit</a>
    }
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <div className='well side-of-post'>
            <p><strong> {this.props.author}</strong></p>
            <img src={this.props.avatarUrl} className='img-circle' height={55} width={55} alt='Avatar' />
            <div id='interests-post' className='row'>
              {interests}
            </div>
          </div>
        </div>
        <div className='col-sm-9'>
          <div className='well'>
            <div style={{ textAlign: 'left' }} className='title'>
              <a href={`/postDetails/${this.props._id}`}>
                <strong><h4>{this.props.title}</h4></strong>
              </a>
            </div>
            <div>
              <p style={{wordWrap: 'break-word', textAlign: 'left'}}>{this.props.content}</p>
            </div>
            <div className='info'>
              <small>{calcTime(this.props)} ago</small>
            </div>
            <div className='controls'>
              <a className='btn btn-default btn-xs' href={`/postDetails/${this.props._id}`}>comments</a>
              {isEditableContent}
              {isDeletableContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
