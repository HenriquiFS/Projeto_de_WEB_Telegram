var char_name_txt = document.querySelector('#char_name'),
    char_img = document.querySelector('#char_img'),
    request = new XMLHttpRequest(),
    button = document.querySelector('#buscar_api'),
    charName = null;

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