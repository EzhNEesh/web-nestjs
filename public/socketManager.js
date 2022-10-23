const socket = io('http://'+document.location.host)

socket.on('postCreated', (newPost) => {
  showWolf(newPost['imageURL'])
})