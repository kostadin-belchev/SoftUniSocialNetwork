import React, { Component } from 'react'
// import PostsList from '../post/PostList'
import PostForm from '../post/PostForm'
import postsService from '../../infrastructure/postsService'
import observer from '../../infrastructure/observer'
import '../../styles/wall.css'
import PostsList from '../post/PostList'
import auth from '../../infrastructure/auth'

class Wall extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      user: {
        avatarUrl: 'http://web.richmond.k12.va.us/portals/14/assets/images/user-avatar-placeholder.png'
      }
    }

    this.handlePostSubmit = this.handlePostSubmit.bind(this)
    this.getPostsFromServer = this.getPostsFromServer.bind(this)
    this.handlePostDelete = this.handlePostDelete.bind(this)
  }

  handlePostSubmit (post) {
    // validations
    if (post.title === '' || post.content === '') {
      observer.trigger(observer.events.notification, { type: 'error', message: 'Title or contents of the post cannot be empty!' })
      return
    }
    observer.trigger(observer.events.notificationHide)
    // Our application is now feature complete but it feels slow to have to wait for the request to complete before your comment appears in the list.
    // We can optimistically add this comment to the list to make the app feel faster.
    let posts = this.state.posts
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    // eslint-disable-next-line
    let userId = sessionStorage.getItem('userId')
    let tempPost = {
      author: '',
      title: post.title,
      content: post.content,
      avatarUrl: 'http://web.richmond.k12.va.us/portals/14/assets/images/user-avatar-placeholder.png',
      _id: Date.now(),
      _acl: { creator: userId },
      _kmd: { ect: Date.now() }
    }
    let newPosts = posts.concat([tempPost])
    this.setState({ posts: newPosts })

    postsService.createPost(this.state.user.username, post.title, this.state.user.avatarUrl, post.content).then(() => {
      // trigger the observer so we can show a notification in case of successful post creation
      observer.trigger(observer.events.notification, { type: 'success', message: 'Post created.' })
      this.getPostsFromServer()
    }).catch(err => console.log(err))
  }

  componentDidMount () {
    this.getPostsFromServer()
    // authomatic update every X seconds
    // let secondsBetweenUpdateFromSever = 4
    // setInterval(this.getPostsFromServer, secondsBetweenUpdateFromSever * 1000)
  }

  getPostsFromServer () {
    postsService.loadAllPosts().then((posts) => {
      // console.log('posts from server:')
      // console.log(posts)
      // eslint-disable-next-line
      auth.getUser(sessionStorage.getItem('userId')).then((user) => {
        // attache onPostDelete Function to each post, here
        for (const post of posts) {
          post.onPostDelete = this.handlePostDelete
        }
        this.setState({ posts, user })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  handlePostDelete (postId, event) {
    event.preventDefault()
    // Our application is now feature complete but it feels slow to have to wait for the request to complete before the post we want to delete disappears from the list.
    // We can optimistically delete this post from the state to make the app feel faster.
    let posts = this.state.posts
    let index
    for (const post of posts) {
      if (post._id === postId) {
        index = posts.indexOf(post)
      }
    }
    if (index > -1) {
      posts.splice(index, 1)
    }
    // let newPosts = posts.reverse()
    let newPosts = posts

    this.setState({ posts: newPosts })
    // just for faster UI notifications
    // observer.trigger(observer.events.notification, { type: 'success', message: 'Post deleted.' })
    // now to actually delete if from database
    postsService.deletePost(postId).then(() => {
      // After successful post delete a notification message “Post deleted.” should be displayed and the catalog should be shown.
      observer.trigger(observer.events.notification, { type: 'success', message: 'Post deleted.' })
      // we can load the database to our state again since the post has been deleted
      postsService.loadAllPosts().then((posts) => {
        this.setState({ posts })
      }).catch(err => console.log(err))
    }).catch(response => {
      // console.log(response)
      // In case of error (e.g. Internet connection lost / unauthorized request / missing message), an error message should be displayed.
      observer.trigger(observer.events.notification, { type: 'error', message: response.responseJSON.description })
    })
  }

  render () {
    let interests
    if (this.state.user.interests) {
      interests = this.state.user.interests.map((interest, index) => {
        return <span key={index} className='label label-default'>{interest}</span>
      })
    }

    return (
      <div className='container-fluid text-center'>
        <div className='row content'>
          <div className='col-sm-3 sidenav'>
            <div className='well'>
              <div className='well'>
                <p><a href='/myProfile'>My Profile</a></p>
                <img src={this.state.user.avatarUrl} className='img-circle' height={65} width={65} alt='Avatar' />
              </div>
              <div id='interests-wall' className='row-sm2 well'>
                <p><strong>Interests</strong></p>
                {interests}
              </div>
              <div className='alert alert-success fade in'>
                <a href='' className='close' data-dismiss='alert' aria-label='close'>×</a>
                <p><strong>Hey!</strong></p>
              Did you know you can update your avatar/profile picture? Go to your  <a href='/myProfile' className='alert-link'>profile page</a> to change it.
              </div>
              <strong>Useful links</strong>
              <br />
              <br />
              <p><a href='https://softuni.bg/' target='_blank' rel='noreferrer noopener'>SoftUni</a></p>
              <p><a href='https://www.bing.com/images/discover?form=Z9LH1' target='_blank' rel='noreferrer noopener'>Bing Images Discover</a></p>
              <p><a href='https://judge.softuni.bg/' target='_blank' rel='noreferrer noopener'>SoftUni Judge</a></p>
            </div>
          </div>

          <div className='col-sm-7'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='panel panel-default text-left'>
                  <div className='panel-body'>
                    <PostForm onPostSubmit={this.handlePostSubmit} />
                  </div>
                </div>
              </div>
            </div>
            {/* <WallMiddle request={postsService.loadAllPosts} /> */}
            <PostsList posts={this.state.posts} />
          </div>

          <div className='col-sm-2 sidenav'>
            {/* <div className='thumbnail'>
              <p>Upcoming Events:</p>
              <img src='paris.jpg' alt='Paris' width={400} height={300} />
              <p><strong>Paris</strong></p>
              <p>Fri. 27 November 2015</p>
              <button className='btn btn-primary'>Info</button>
            </div> */}
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

export default Wall
