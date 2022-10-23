//import { Toast } from 'toaster-js';
//import "/toaster-js/default.scss";
//const Toast = require(['toaster-js']);

const socket = io(document.location.host);
function testToast() {
  new Toast('В нашк стаю был добавлен новый волк!', Toast.TYPE_MESSAGE );
}

socket.on('postCreated', (newPost) => {
  showWolf(newPost['imageURL']);
  new Toast('К нашей стае присоединился новый волк!', Toast.TYPE_MESSAGE);
})