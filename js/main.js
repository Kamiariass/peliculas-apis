
const API_KEY = '6c683a835cdd20acc7f628df1f598354';
const API_URL = `https://api.themoviedb.org/3/discover/movie?language=es-ES&sort_by=popularity.desc&api_key=${API_KEY}`;

if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration){
                // registro ok
                console.log('Service Worker registrado, ', registration.scope);
                console.log('Service Worker contenido, ', registration)
            }).catch(function(error){
                //registro fallo :(
                console.log('El registro del serviceWorker fallo: ', error)
            })
    })
}

document.addEventListener('DOMContentLoaded', () => {
  cargarPeliculas();
});

async function cargarPeliculas() {
  const contenedor = document.getElementById('peliculas-list');
  if (!contenedor) return;

  try {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();

    contenedor.innerHTML = '';

    data.results.forEach(pelicula => {
  const poster = pelicula.poster_path
    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
    : 'sources/icon/icon500.png';

  const card = document.createElement('div');
card.className = 'card-pelicula';

card.innerHTML = `
 <div class="card-pelicula">
  <div class="card h-100 shadow-sm">
    <img src="${poster}" class="card-img-top" alt="${pelicula.title}" onerror="this.src='sources/icon/icon500.png'" />
    <div class="card-body d-flex flex-column justify-content-between text-center">
      <h5 class="card-title mb-3">${pelicula.title}</h5>
      <div class="mt-auto d-flex justify-content-center gap-2 flex-wrap">
        <a href="detalles.html?id=${pelicula.id}" class="btn btn-outline-primary">Ver Detalles</a>
        <button
          class="btn btn-primary btn-fav"
          data-id="${pelicula.id}"
          data-title="${pelicula.title}"
          data-poster="${poster}"
        >
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  </div>
</div>

`;

  contenedor.appendChild(card);
});


    activarBotonesFavoritos();

  } catch (error) {
    console.error('Error al cargar películas:', error);
    contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar las películas populares.</p>`;
  }
}

function activarBotonesFavoritos() {
  const botones = document.querySelectorAll('.btn-fav');

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const poster = btn.getAttribute('data-poster');
      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

      if (!favoritos.some(fav => fav.id === id)) {
        favoritos.push({ id, title, poster });
        localStorage.setItem('favoritos', JSON.stringify(favoritos));

        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');
        btn.innerHTML = `<i class="fas fa-check"></i>`;

        Swal.fire({
          icon: 'success',
          title: 'Agregado a Favoritos',
          text: `"${title}" fue agregado a tus favoritos.`,
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-confirm-btn',
          }
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Ya está en Favoritos',
          text: `"${title}" ya está en tus favoritos.`,
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-confirm-btn',
          }
        });
      }
    });
  });
}
