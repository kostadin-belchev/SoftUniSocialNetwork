import React, { Component } from 'react'
import Post from './Post'
// import withLoading from './../../infrastructure/withLoading'

class PostsList extends Component {
  // reverse deleted
  render () {
    let postsNodes = this.props.posts.map((post) => {
      // console.log('each post: ')
      // console.log(post)
      post.isEditable = false
      // eslint-disable-next-line
      if (post._acl.creator === sessionStorage.getItem('userId')) {
        post.isEditable = true
      }
      return (<Post key={post._id} {...post} />)
    })

    return (postsNodes)
  }
}

// const PostsList = withLoading(PostsListBase)

export default PostsList

// return (this.props.posts.length === 0
//   ? <div className='comment-content' style={{fontStyle: 'italic'}}><p>(No posts in database)</p></div>
//   : postsNodes)
