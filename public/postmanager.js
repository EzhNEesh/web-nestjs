window.post = function (url, data, method) {
  let headers = {
    'Content-Type': 'application/json'
  }
  return fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  });
}

async function downloadImage() {
  let allowed = ['png', 'jpeg', 'jpg'];
  let img = document.querySelector('input');
  let wolfType = document.querySelector('select').value;
  if (!img.files[0] || !allowed.includes(img.value.split('.').pop())) {
    alert('Изображение не выбрано или формат не поддерживается приложением')
    return;
  }
  if(img.files[0].size > 5000000){
    alert('Изображение не может превышать размер 5 Мб')
    return;
  }
  let reader = new FileReader()
  reader.readAsDataURL(img.files[0]);
  reader.onload = async () => {
    let res = await post(
      '/posts',
      {
        imageURL: reader.result,
        wolfType: wolfType,
      },
      'POST',
    );
    if (!res.ok){
      alert('Error status: ' + res.status);
    }
  }
}

async function getWolves(...data) {
  let url;
  let userPosts = false;
  if(data.length === 2){
    url = '/posts/' + data[0] + '&' + data[1];
  }
  else{
    url = '/posts/user/posts/' + data[0];
    userPosts = true
  }
  let res = await fetch(url);
  if (res.ok) {
    let resJSON = await res.json();
    if(resJSON.length < 10){
      hideButton('content__button-right')
    }
    resJSON.forEach(function(wolfItem){
      showWolf(wolfItem, userPosts);
    })
  }
  else {
    alert('Error status: ' + res.status);
  }
}

function showWolf(wolfItem, userPosts=false) {
  let container = document.querySelector('#img-container');
  let temp = document.querySelector('#img-item');
  let post = temp.content.querySelector('.content__post')
  let img = post.querySelector('img');
  let deleteButton = post.querySelector('button');
  img.src = wolfItem['imageURL'];
  if(userPosts) {
    deleteButton.dataset.postId = wolfItem['id'];
  }
  else{
    deleteButton.style.display = 'none';
  }
  let cloneCont = temp.content.cloneNode(true);
  container.prepend(cloneCont);
}

async function deleteWolf(deleteInfo){
  let res = await fetch('/posts/' + deleteInfo.dataset.postId, {method: 'DELETE'});
  if (!res.ok){
    alert('Error: ' + res.status);
  }
  else{
    alert('Волк удален');
  }
  console.log(deleteInfo.dataset.postId);
}