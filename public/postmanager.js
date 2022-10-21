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
    if (res.ok){
      showWolf(reader.result);
    }
    else{
      alert('Error status: ' + res.status);
    }
  }
}

async function getWolves(...data) {
  let url;
  if(data.length){
    url = '/posts/' + data[0];
  }
  else{
    url = '/posts/user/posts';
  }
  let res = await fetch(url);
  if (res.ok) {
    let resJSON = await res.json();
    resJSON.forEach(function(wolfItem){
      showWolf(wolfItem['imageURL']);
    })
  }
  else {
    alert('Error status: ' + res.status)
  }

}

function showWolf(wolfUrl) {
  let container = document.querySelector('#img-container');
  let temp = document.querySelector('#img-item');
  let img = temp.content.querySelector('img');
  img.src = wolfUrl;
  let cloneCont = temp.content.cloneNode(true);
  container.append(cloneCont);
}