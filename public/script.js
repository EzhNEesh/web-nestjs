function showSubMenu (menu) {
    let submenu = menu.children[0]
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none'
    }else {
        submenu.style.display = 'block'
    }
    //menuClass = document.getElementsByClassName()
    // let target=event.target
    // if(target.className === 'header-info__menu') {
    //     let ms = document.getElementsByClassName('menu__submenu')
    //     ms[0].style.display='block'
    // } else {
    //     let ms = document.getElementsByClassName('menu__submenu')
    //     ms[0].style.display='none'
    // }
}

window.onload = function () {
    let loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
    document.getElementById('page-load-time').textContent += ' ' + loadTime + ' ms (Client)';
    let loc = window.location.href.split('/').pop().split('?');
    let payload
    let pageName
    if(loc.length > 1){
        payload = loc[1].split('=')[1];
        pageName = loc[0];
    }
    else{
        payload = 1
        pageName = loc[0]
    }
    if(pageName.split('.')[1] !== 'html'){
        pageName = payload;
        payload = 1;
    }
    if(!['login.html', 'register.html', 'memes.html'].includes(pageName)) {
        if(pageName === 'neurowolves.html'){
            getWolves('neuro', payload);
        }
        else if(pageName === 'myWolves.html'){
            getWolves(payload); // getCookieValue('userId')
        }
        else{
            getWolves('common', payload);
        }
        createHeader();
    }
}

function getCookieValue(name) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
}