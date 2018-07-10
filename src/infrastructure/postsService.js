import requester from './requester'

function loadAllPosts () {
  return requester.get('appdata', 'posts', 'kinvey')
}

function createPost (author, title, url, imageUrl, description) {
  let postObj = {
    author,
    title,
    url,
    imageUrl,
    description
  }

  return requester.post('appdata', 'posts', 'kinvey', postObj)
}

function editPost (postId, author, title, url, imageUrl, description) {
  let updatedPostObj = {
    author,
    title,
    url,
    imageUrl,
    description
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
