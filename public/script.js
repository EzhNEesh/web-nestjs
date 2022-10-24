function showSubMenu (menu) {
    let submenu = menu.children[0]
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none'
    }else {
        submenu.style.display = 'block'
    }
}

window.onload = function () {
    let loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
    document.getElementById('page-load-time').textContent += ' ' + loadTime + ' ms (Client)';
    let {payload, pageName} = getLocation()
    if(!['login.html', 'register.html'].includes(pageName)) {
        if(pageName !== 'memes.html') {
            if (pageName === 'neurowolves.html') {
                getWolves('neuro', payload);
            } else if (pageName === 'myWolves.html') {
                getWolves(payload); // getCookieValue('userId')
            } else {
                getWolves('common', payload);
            }
        }
        createHeader();
    }
}

function getCookieValue(name) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
}