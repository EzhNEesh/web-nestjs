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
    window.location.replace('index.html')
  }
  else
  {
    alert('Error status: ' + res.status)
  }
}

async function login() {
  const email = document.querySelector("input[name=email]").value;
  const username = document.querySelector("input[name=username]").value;
  const password = document.querySelector("input[name=password]").value;
  let res = await post(
    '/auth/login',
    {
      name: username,
      email: email,
      password: password,
    },
    'POST'
  );
  if(res){
    window.location.replace('index.html');
  }
  else
  {
    alert('Error status: ' + res.status);
  }
}