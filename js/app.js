$( document ).ready(function(){

    var idImg;
    const API_URL = 'https://swapi.dev/api/';
    const PEOPLE_URL = 'people/:id/';
    const opts = {crossDomain:true};

    function resetModal() {
        $('.modal-body>.container-fluid>.row').html('');
        $('#exampleModalLongTitle').html('');    
      }

    const onPeopleResponse = function(data){
    
        
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

    function obtenerPersonaje (id){
        const url = `${API_URL}${PEOPLE_URL.replace(':id', id)}`
        $.get(url, opts, onPeopleResponse);
        console.log(url);
    }
  
    var images = $('#people-container figure img');
    images.on('click', function(){
        idImg = $(this).prop('id');
        obtenerPersonaje(idImg);
    })


    $('body').click(resetModal);
    $('#brn-close').click(resetModal);





});

