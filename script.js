var char_name_txt = document.querySelector('#char_name'),
    char_img = document.querySelector('#char_img'),
    request = new XMLHttpRequest(),
    buttonBuscarAPI = document.querySelector('#buscar_api'),
    loginButton = document.querySelector('#login_button'),
    confirmButton = document.querySelector('#confirm'),
    charName = null;
    guardaToken = null;
    isLogged = false;

if(localStorage.getItem("token") === "QpwL5tke4Pnpja7X4"){
  isLogged = true;
  document.querySelector('#login_button').innerHTML = 'Logout';
  document.querySelector('.container_busca').style.display = 'flex';
}

loginButton.addEventListener('click', () => {

  if(isLogged===true){
    alert("Saindo");
    localStorage.setItem("token",null);
    isLogged=false;
    document.querySelector('.container_busca').style.display = 'none';
    document.querySelector('.login_box').style.display = 'none';
    document.querySelector('#login_button').innerHTML = 'Login';
  } else {
    document.querySelector('.login_box').style.display = 'flex';
  }

});

function fazer_login(auxEmail, auxSenha){
  axios.post('https://reqres.in/api/login',{
    "email": auxEmail,
    "password": auxSenha
  })
  .then( function (res) {
    var resToken = res.data.token;
    guardaToken = resToken;
    alert('Login efetuado com sucesso!');
    document.querySelector('.container_busca').style.display = 'flex';
    document.querySelector('#login_button').innerHTML = 'Logout';

    localStorage.setItem("token", resToken);

    isLogged = true;
  })
  .catch( () => {
    alert("Erro ao realizar Login.");
  });
}

confirmButton.addEventListener('click', () => {
  var loginEmail = document.querySelector('#login_email').value;
  var loginSenha = document.querySelector('#login_senha').value;
  var erroEmail = document.querySelector('#erro_email');
  var erroSenha = document.querySelector('#erro_senha');
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

buttonBuscarAPI.addEventListener('click', () => {
  var input = document.querySelector('#input_api');
  var input_tamanho = document.querySelector('#input_api').value;
  var erroBusca = document.querySelector('#erro_busca');
  var charName = input.value;

  if(input_tamanho.length <= 3){
    erroBusca.innerHTML = "A busca precisa ter no mínimo 3 caracteres!";
  } else{
    erroBusca.innerHTML = "";
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
  }
});

