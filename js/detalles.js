// detalles.js

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const contenedor = document.getElementById('detalle-pelicula');

  if (!contenedor) return;

  if (!id) {
    contenedor.innerHTML = '<p class="text-danger">ID de película no proporcionado.</p>';
    return;
  }

  let pelicula = null;
  const cache = localStorage.getItem('peliculas-cache');
  if (cache) {
    const peliculas = JSON.parse(cache);
    pelicula = peliculas.find(p => p.id == id);
  }

  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6c683a835cdd20acc7f628df1f598354&language=es-ES`);

    if (!respuesta.ok) throw new Error(`HTTP error! status: ${respuesta.status}`);

    const data = await respuesta.json();

    pelicula = {
      id: data.id,
      title: data.title,
      poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'sources/icon/icon192.png',
      description: data.overview,
      release_date: data.release_date,
      vote_average: data.vote_average,
      genres: data.genres.map(g => g.name).join(', '),
      runtime: data.runtime
    };
  } catch (error) {
    console.warn('No se pudo obtener detalles de la API:', error);
    if (!pelicula) {
      contenedor.innerHTML = '<p class="text-danger">No hay datos disponibles para esta película.</p>';
      return;
    }
  }

  contenedor.innerHTML = `
    <div class="card">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${pelicula.poster}" class="img-fluid rounded-start" alt="${pelicula.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">${pelicula.title}</h2>
            <p><strong>Fecha de estreno:</strong> ${pelicula.release_date || 'No disponible'}</p>
            <p><strong>Duración:</strong> ${pelicula.runtime ? pelicula.runtime + ' minutos' : 'No disponible'}</p>
            <p><strong>Géneros:</strong> ${pelicula.genres || 'No disponible'}</p>
            <p><strong>Puntuación:</strong> ${pelicula.vote_average || 'No disponible'}</p>
            <p>${pelicula.description || 'Sin descripción disponible.'}</p>
            <button id="btn-fav-detalles" class="btn btn-primary">Agregar a Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-fav-detalles').addEventListener('click', () => agregarAFavoritos(pelicula));
});

function agregarAFavoritos(pelicula) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (!favoritos.some(fav => fav.id == pelicula.id)) {
    favoritos.push({
      id: pelicula.id,
      title: pelicula.title,
      poster: pelicula.poster
    });
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    Swal.fire({
      icon: 'success',
      title: 'Agregado a favoritos',
      text: `"${pelicula.title}" fue agregado a tus favoritos.`,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm-btn',
        cancelButton: 'swal-custom-cancel-btn',
        image: 'swal-custom-image',
      }
    });
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Ya está en favoritos',
      text: `"${pelicula.title}" ya fue agregado anteriormente.`,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm-btn',
        cancelButton: 'swal-custom-cancel-btn',
        image: 'swal-custom-image',
      }
    });
  }
}
