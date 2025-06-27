const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const buscadorInput = document.getElementById('buscador');
const btnBuscar = document.getElementById('btn-buscar');
const peliculasList = document.getElementById('peliculas-list');

let debounceTimeout = null;

async function buscarPeliculas(query) {
  if (!query) {
    mostrarMensaje('Por favor ingresa un término para buscar.');
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      mostrarMensaje('No se encontraron películas para tu búsqueda.');
    } else {
      mostrarPeliculas(data.results);
    }
  } catch (error) {
    console.error('Error al buscar películas:', error);
    mostrarMensaje('Hubo un error al buscar las películas.');
  }
}

async function obtenerPeliculasPopulares() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    mostrarPeliculas(data.results);
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    mostrarMensaje('Hubo un error al cargar las películas populares.');
  }
}

function mostrarPeliculas(peliculas) {
  if (!peliculasList) return;

  peliculasList.innerHTML = peliculas
  .map((pelicula) => {
    const poster = pelicula.poster_path
      ? `${IMG_URL}${pelicula.poster_path}`
      : 'sources/icon/icon500.png';

    return `
<div class="card-pelicula">
        <div class="card h-100 shadow-sm card-pelicula">
          <img src="${poster}" class="card-img-top" alt="${pelicula.title}" onerror="this.src='sources/icon/icon500.png'" />
          <div class="card-body d-flex flex-column text-center">
            <h5 class="card-title">${pelicula.title}</h5>
            <div class="mt-auto d-flex justify-content-center gap-2">
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
  })
  .join('');

  activarBotonesFavoritos();
}

function mostrarMensaje(mensaje) {
  if (!peliculasList) return;

  peliculasList.innerHTML = `
    <div class="col-12">
      <p class="text-center text-muted fs-5">${mensaje}</p>
    </div>
  `;
}

if (buscadorInput) {
  buscadorInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const query = buscadorInput.value.trim();
      if (query.length > 0) {
        buscarPeliculas(query);
      } else {
        obtenerPeliculasPopulares();
      }
    }, 500);
  });
}

if (btnBuscar) {
  btnBuscar.addEventListener('click', () => {
    const query = buscadorInput.value.trim();
    if (query.length > 0) {
      buscarPeliculas(query);
    } else {
      mostrarMensaje('Por favor ingresa un término para buscar.');
    }
  });
}

window.addEventListener('load', () => {
  obtenerPeliculasPopulares();
});

window.addEventListener('offline', () => {
  mostrarMensaje('No tienes conexión a internet.');
});