function createHeader(){
  if(getCookieValue('token')){
    createHeaderItem('Мои волки', 'myWolves.html');
  }
  else{
    createHeaderItem('Войти', 'login.html');
  }
  createHeaderItem('Волки', 'index.html');
  createHeaderItem('Нейроволки', 'neurowolves.html');
  if(getCookieValue('token')){
    createHeaderItem('Выйти', 'logout');
    addEventListenerLogout();
  }
  let arrayHref = document.getElementsByClassName('menu__menu-item_text')
  let curLoc = document.location.href;
  for (let i = 0; i < arrayHref.length; i++) {
    if (curLoc === arrayHref[i].href) {
      arrayHref[i].classList.add('menu__menu-item_text_is-located');
      break;
    }
  }
}

function createHeaderItem(itemText, url){
  let container = document.querySelector('#menu-container');
  let temp = document.querySelector('#menu-container-item');
  let ulElement = temp.content.querySelector('ul')
  let aElement = ulElement.querySelector('a');
  aElement.textContent = itemText;
  if(url !== 'logout'){
    aElement.href = url;
  }
  let cloneCont = temp.content.cloneNode(true);
  container.append(cloneCont);
}