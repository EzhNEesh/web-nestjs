const socket = io()

socket.on('postCreated', (newPost) => {
  showWolf(newPost['imageURL'])
})