var char_name_txt = document.querySelector('#char_name'),
    char_img = document.querySelector('#char_img'),
    request = new XMLHttpRequest(),
    buttonBuscarAPI = document.querySelector('#buscar_api'),
    loginButton = document.querySelector('#login_button'),
    confirmButton = document.querySelector('#confirm'),
    resultados_api = document.querySelector('#search_results'),
    isLogged = false;


// Checa se o usuário já esta logado
if(localStorage.getItem("login")){
  isLogged = true;
  document.querySelector('#login_button').innerHTML = 'Logout';
  document.querySelector('.container_busca').style.display = 'flex';
}


// Processa o clique no botão de login
loginButton.addEventListener('click', () => {

  if(isLogged===true){
    localStorage.removeItem("login");
    isLogged=false;
    document.querySelector('.container_busca').style.display = 'none';
    document.querySelector('.login_box').style.display = 'none';
    document.querySelector('#login_button').innerHTML = 'Login';
  } else {
    document.querySelector('.login_box').style.display = 'flex';
  }

});

// Função que realiza o login
function fazer_login(auxEmail, auxSenha){
  axios.post('https://reqres.in/api/login',{
    "email": auxEmail,
    "password": auxSenha
  })
  .then( function (res) {
    isLogged = true;
    document.querySelector('.container_busca').style.display = 'flex';
    document.querySelector('#login_button').innerHTML = 'Logout';

    localStorage.setItem("login", isLogged);
  })
  .catch( () => {
    alert("Erro ao realizar Login.");
  });
}

// Checa os inputs do usuário e senha e chama a função de login
confirmButton.addEventListener('click', () => {
  var loginEmail = document.querySelector('#login_email').value,
      loginSenha = document.querySelector('#login_senha').value,
      erroEmail = document.querySelector('#erro_email'),
      erroSenha = document.querySelector('#erro_senha');

  if(loginEmail.length <= 3){
    erroEmail.innerHTML = "O E-mail precisa ter no mínimo 3 caracteres!";
    erroSenha.innerHTML = "";
    
  } else if(loginSenha.length <= 3){
    erroEmail.innerHTML = "";
    erroSenha.innerHTML = "A senha precisa ter no mínimo 3 caracteres!";

  } else{
    erroEmail.innerHTML = "";
    erroSenha.innerHTML = "";
    fazer_login(loginEmail, loginSenha);
  }
});

// Realizar uma busca com base na API selecionada
buttonBuscarAPI.addEventListener('click', () => {
  var input = document.querySelector('#input_api'),
      input_tamanho = document.querySelector('#input_api').value,
      erroBusca = document.querySelector('#erro_busca'),
      charName = input.value;

  resultados_api.innerHTML = "";
  erroBusca.innerHTML = " ";

  if(input_tamanho.length <= 3){
    erroBusca.innerHTML = "A busca precisa ter no mínimo 3 caracteres!";
  } else{
    erroBusca.innerHTML = "";
    request.open('GET', 'https://amiiboapi.com/api/amiibo/?name=' + charName, true)

    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        let resposta = JSON.parse(request.responseText);
        let resposta_tamanho = resposta.amiibo.length;

        for( var i = 0; i < resposta_tamanho; i++){
          var nome_amiibo = document.createElement('p'),
              img_amiibo = document.createElement('img');

          nome_amiibo.innerHTML = resposta.amiibo[i].character;
          img_amiibo.src = resposta.amiibo[i].image;

          nome_amiibo.style.color = 'white';
          nome_amiibo.style.fontSize = '20px';
          nome_amiibo.style.fontFamily = 'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, Verdana, sans-serif';
          nome_amiibo.style.textAlign = 'center';
          nome_amiibo.style.margin = '20px';

          img_amiibo.style.borderBottom = '3px solid white';
          img_amiibo.style.paddingBottom = '15px';

          resultados_api.appendChild(nome_amiibo);
          resultados_api.appendChild(img_amiibo);
        };

      } 
    }  
    request.send()
  }
});
