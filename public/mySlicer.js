function getLocation(){
  let loc = window.location.href.split('/').pop().split('?');
  let payload;
  let pageName;
  if(loc.length > 1){
    payload = loc[1].split('=')[1];
    pageName = loc[0];
  }
  else{
    payload = 1;
    pageName = loc[0];
  }
  if(pageName.split('.')[1] !== 'html'){
    if(payload !== 1) {
      pageName = payload;
      payload = 1;
    }
    else{
      pageName = 'index.html'
    }
  }
  if((payload === 1 || payload === '1') && pageName !== 'memes.html'){
    hideButton('content__button-left')
  }
  return {pageName: pageName, payload: payload}
}

function nextPage(){
  let {payload, pageName} = getLocation();
  document.location.replace(pageName + '?page=' + (parseInt(payload) + 1));
}

function prevPage(){
  let {payload, pageName} = getLocation();
  document.location.replace(pageName + '?page=' + (parseInt(payload) - 1));
}

function hideButton(buttonClassName){
  document.querySelector('.' + buttonClassName).style.display = 'none';
}