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
    let loc = window.location.href.split('/').pop();
    if(!['login.html', 'register.html', 'memes.pug'].includes(loc)) {
        if (loc !== 'memes.html'){
            if(loc === 'neurowolves.html'){
                getWolves('neuro');
            }
            else if(loc === 'myWolves.html'){
                getWolves(); // getCookieValue('userId')
            }
            else{
                getWolves('common');
            }
        }
        createHeader();
    }
}

function getCookieValue(name) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
}