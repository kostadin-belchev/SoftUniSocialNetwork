import React, { Component } from 'react'
import MyPostsListAdmin from '../post/MyPostsListAdmin'
// import PostForm from '../post/PostForm'
import postsService from '../../infrastructure/postsService'

class AdminPanel extends Component {
  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-3 sidenav'>
            <div className='well'>
              <p>Admin Tools</p>
            </div>
          </div>

          <div className='col-sm-7'>
            <div className='row'>
              <MyPostsListAdmin request={postsService.loadAllPosts} />
            </div>

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

export default AdminPanel
