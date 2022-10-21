window.post = function (url, data, method) {
  let headers = {
    'Content-Type': 'application/json'
  }
  headers['Authorization'] = 'Bearer ' + getCookieValue('token');
  return fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  });
}

function getCookieValue(name) {
  const val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
  if(val.length > 0){
    return val
  }
  else{
    return null
  }
}

async function register() {
  const email = document.querySelector("input[name=email]").value;
  const username = document.querySelector("input[name=username]").value;
  const password = document.querySelector("input[name=password]").value;
  let res = await post(
    '/auth/register',
    {
      name: username,
      email: email,
      password: password
    },
    'POST'
  );
  if(res.ok){
    await login(email, password)
  }
  else
  {
    alert('Error status: ' + res.status)
  }
}

async function login(...data) {
  let userEmail, userPassword
  if(data.length){
    userEmail = data[0];
    userPassword = data[1];
  }
  else {
    userEmail = document.querySelector("input[name=email]").value;
    userPassword = document.querySelector("input[name=password]").value;
  }
  let res = await post(
    'auth/login',
    {
      email: userEmail,
      password: userPassword,
    },
    'POST'
  );
  const cookies = await res.json();
  document.cookie = 'token=' + cookies.access_token;
  console.log('meow')
  if(cookies.status === 201){
    let lifeTime = new Date();
    lifeTime.setTime(lifeTime.getTime() + 1200 * 1000);
    document.cookie = 'token=' + cookies.access_token + '; expires=' + lifeTime.toUTCString();
    window.location.replace('index.html');
  }
  else
  {
    alert('Error status: ' + cookies.status);
  }
  return true
}