import requester from './requester'

function loadAllPosts () {
  return requester.get('appdata', 'posts', 'kinvey')
}

function createPost (author, title, avatarUrl, content) {
  let postObj = {
    author,
    title,
    avatarUrl,
    content
  }

  return requester.post('appdata', 'posts', 'kinvey', postObj)
}

function editPost (postId, author, title, avatarUrl, content) {
  let updatedPostObj = {
    author,
    title,
    avatarUrl,
    content
  }

  return requester.update('appdata', `posts/${postId}`, 'kinvey', updatedPostObj)
}

function deletePost (postId) {
  return requester.remove('appdata', `posts/${postId}`, 'kinvey')
}

function loadOwnPosts (username) {
  let endpoint = `posts?query={"author":"${username}"}`

  return requester.get('appdata', endpoint, 'kinvey')
}

function loadPostById (postId) {
  let endpoint = `posts/${postId}`

  return requester.get('appdata', endpoint, 'kinvey')
}

export default {
  loadAllPosts,
  createPost,
  editPost,
  deletePost,
  loadOwnPosts,
  loadPostById
}
