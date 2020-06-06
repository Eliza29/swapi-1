window.onload = () => {
  let idImg;
  let resultHome;

  function resetModal() {
    $('.modal-body>.container-fluid>.row').html('');
    $('#exampleModalLongTitle').html('');    
  }

  function getData(event) {
    event.preventDefault();
    idImg = event.target.id;
    let url = `https://swapi.dev/api/people/${idImg}`;
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = addDataCharacters;
    req.onerror = handleError;
    req.send();
  }

  function handleError() {
    console.log('se ha producido un error');
  }

  function addDataCharacters() {
    const data = JSON.parse(this.responseText);
    // obteniendo datos de homeworld 
    let newRequest = new XMLHttpRequest();
    newRequest.open('GET', data.homeworld);
    newRequest.onload = getExtraData;
    newRequest.onerror = handleError;
    newRequest.send();

    function getExtraData() {
      const dataHome = JSON.parse(this.responseText);
      resultHome = dataHome.name;
    }

    // funcionalidad para crear el contenido del modal
    let modalBody = $('.modal-body>.container-fluid>.row');
    modalBody.html('');    
    let contentModal = `
      <figure class="col-11 col-md-5">
        <img src="assets/images/${idImg}.png" id="insert-img" class="img-fluid">
      </figure>
      <div class="col-11 col-md-5">
        <p>
          <b>Gender:</b>
          <span id="gender">${data.gender}</span>
        </p>
        <p>
          <b>Home World:</b>
          <span id="home-world">${resultHome}</span>
        </p>
        <p>
          <b>Birth Year:</b>
          <span id="birth-year">${data.birth_year}</span>
        </p>
        <p>
          <b>Height:</b>
          <span id="height">${data.height}</span>
        </p>
        <p>
          <b>Mass:</b>
          <span id="mass">${data.mass}</span>
        </p>
        <p>
          <b>Eye color:</b>
          <span id="eye">${data.eye_color}</span>
        </p>
        <p>
          <b>Hair color:</b>
          <span id="hair">${data.hair_color}</span>
        </p>
        <p>
          <b>Skin color:</b>
          <span id="skin">${data.skin_color}</span>
        </p>
      </div>
    `;
    $(modalBody).html(contentModal);
    $('#exampleModalLongTitle').html(data.name);
  }

  var images = $('#people-container figure img');

  images = [...images];
  images.forEach(img => {
    img.addEventListener('click', getData);
  });

  $('body').click(resetModal);
  $('#brn-close').click(resetModal);
};