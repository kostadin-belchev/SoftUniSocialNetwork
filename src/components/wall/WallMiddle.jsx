import React, { Component } from 'react'
import PostsList from '../post/PostList'
// import PostForm from '../post/PostForm'
// import postsService from '../../infrastructure/postsService'
// import observer from '../../infrastructure/observer'
import withLoading from '../../infrastructure/withLoading'

class WallMiddleBase extends Component {
  // constructor (props) {
  //   super(props)

  //   this.state = { posts: this.props.data }
  //   // this.getPostsFromServer = this.getPostsFromServer.bind(this)
  // }

  render () {
    return (
      <PostsList posts={this.props.data} />
    )
  }
}

const WallMiddle = withLoading(WallMiddleBase)

export default WallMiddle
