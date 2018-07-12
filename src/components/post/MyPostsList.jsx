import React, { Component } from 'react'
import Post from './Post'
import withLoading from '../helpers/withLoading'

class MyPostsListBase extends Component {
  render () {
    if (this.props.data.length === 0) {
      return <div className='post-content' style={{fontStyle: 'italic'}}><p>(No own posts in database)</p></div>
    }
    return this.props.data.map((post, index) => {
      post.isEditable = false
      // eslint-disable-next-line
      if (post._acl.creator === sessionStorage.getItem('userId')) {
        post.isEditable = true
      }
      return (<Post key={post._id} rank={index} {...post} />)
    })
  }
}

const MyPostsList = withLoading(MyPostsListBase)

export default MyPostsList
