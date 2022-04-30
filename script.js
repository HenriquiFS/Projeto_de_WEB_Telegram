var char_name_txt = document.querySelector('#char_name'),
    char_img = document.querySelector('#char_img'),
    request = new XMLHttpRequest(),
    button = document.querySelector('#buscar_api'),
    loginButton = document.querySelector('#login_button'),
    confirmButton = document.querySelector('#confirm'),
    charName = null;
    cookieEmail = null;
    cookieSenha = null;



button.addEventListener('click', () => {
  var input = document.querySelector('#input_api');
  charName = input.value;

  request.open('GET', 'https://amiiboapi.com/api/amiibo/?name=' + charName, true)

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      let resposta = JSON.parse(request.responseText)
      console.log(resposta);
      char_name_txt.innerHTML = resposta.amiibo[0].character;
      char_img.src = resposta.amiibo[0].image;
    }
  }  
  request.send()
});

loginButton.addEventListener('click', () => {
  document.querySelector('.login_box').style.display = 'block';
});

function fazer_login(auxEmail, auxSenha){
  axios.post('https://reqres.in/api/login',{
    "email": auxEmail,
    "password": auxSenha
  })
  .then( () => {
    document.querySelector('.container_busca').style.display = 'block';
    document.querySelector('#login_button').innerHTML = 'Logout';
    localStorage.setItem(cookieEmail, auxEmail);
    localStorage.setItem(cookieSenha, auxSenha);
  })
  .catch( () => {
    alert("Erro!!!!");
  });
}

confirmButton.addEventListener('click', () => {
  var loginEmail = document.querySelector('#login_email').value;
  var loginSenha = document.querySelector('#login_senha').value;
  fazer_login(loginEmail, loginSenha);

});

if(localStorage.getItem(cookieEmail) !== null && localStorage.getItem(cookieSenha) !== null){
  var storageEmail = localStorage.getItem(cookieEmail);
  var storageSenha = localStorage.getItem(cookieSenha);
  fazer_login(storageEmail, storageSenha);
}

