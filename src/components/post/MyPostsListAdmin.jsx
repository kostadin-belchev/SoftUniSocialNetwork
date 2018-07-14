import React, { Component } from 'react'
import Post from './Post'
import withLoading from '../helpers/withLoading'

class MyPostsListAdminBase extends Component {
  // reverse deleted
  render () {
    if (this.props.data.length === 0) {
      return <div className='post-content' style={{fontStyle: 'italic'}}><p>(No posts in database)</p></div>
    }
    return this.props.data.map((post, index) => {
      post.isEditable = true
      return (<Post key={post._id} rank={index} {...post} />)
    })
  }
}

const MyPostsListAdmin = withLoading(MyPostsListAdminBase)

export default MyPostsListAdmin
