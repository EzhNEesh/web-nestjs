//import { Toast } from 'toaster-js';
//import "/toaster-js/default.scss";
//const Toast = require(['toaster-js']);

const socket = io(document.location.host);

socket.on('postCreated', (newPost) => {
  let {pageName, payload} = getLocation();
  let userPosts = false;
  if(pageName === 'myWolves.html'){
    userPosts = true;
  }
  showWolf(newPost, userPosts);
  new Toast('К нашей стае присоединился новый волк!', Toast.TYPE_MESSAGE);
})