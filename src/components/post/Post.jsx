import React, { Component } from 'react'
import calcTime from '../../infrastructure/calcTime'
import '../../styles/post.css'

class Post extends Component {
  render () {
    let isEditableContent
    let isDeletableContent
    if (this.props.isEditable) {
      isEditableContent = <a className='btn btn-info btn-xs' href={`/editPost/${this.props._id}`}>edit</a>
      isDeletableContent = <a className='btn btn-danger btn-xs' onClick={(e) => this.props.onPostDelete(this.props._id, e)}>delete</a>
    }
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <div className='well'>
            <p><strong> {this.props.author}</strong></p>
            <img src={this.props.avatarUrl} className='img-circle' height={55} width={55} alt='Avatar' />
            <div className='info'>
              <small>{calcTime(this.props)} ago</small>
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

// <article className='post'>
//   <div className='col rank'>
//     <span>{this.props.rank + 1}</span>
//   </div>
//   <div className='col thumbnail'>
//     <a href={this.props.url}>
//       <img src={this.props.imageUrl} alt='post' />
//     </a>
//   </div>
//   <div className='post-content'>
//     <div className='title'>
//       <a href={this.props.url}>
//         {this.props.title}
//       </a>
//     </div>
//     <div className='details'>
//       <div className='info'>
//         submitted {calcTime(this.props)} ago by {this.props.author}
//       </div>
//       <div className='controls'>
//         <ul>
//           <li className='action'><a className='commentsLink' href={`/postDetails/${this.props._id}`}>comments</a></li>
//           {isEditableContent}
//           {isDeletableContent}
//         </ul>
//       </div>
//     </div>
//   </div>
// </article>
