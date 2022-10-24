function addEventListenerLogout(){
  let menuItems = document.querySelectorAll('.menu__menu-item');
  menuItems.forEach(function(menuItem){
    if(menuItem.querySelector('a').textContent === 'Выйти'){
      menuItem.addEventListener('click', logout);
    }
  })
}

async function logout(){
  let _ = await fetch('/logout');
  /*
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  */
  document.location.reload();
}