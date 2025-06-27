// js/favoritos.js

document.addEventListener('DOMContentLoaded', mostrarFavoritos);

function activarEliminar() {
  const botonesEliminar = document.querySelectorAll('.btn-eliminar');

  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.getAttribute('data-id');
      const title = boton.getAttribute('data-title');
      const poster = boton.getAttribute('data-poster');

      Swal.fire({
        title: `¿Estás segura de eliminar "${title}"?`,
        imageUrl: poster,
        imageWidth: 200,
        imageHeight: 300,
        imageAlt: title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-confirm-btn',
          cancelButton: 'swal-custom-cancel-btn',
          image: 'swal-custom-image',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarFavorito(id);
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: `"${title}" fue eliminado de tus favoritos.`,
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
  });
}

function mostrarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const contenedor = document.getElementById('peliculas-list');
  contenedor.innerHTML = '';

  if (favoritos.length === 0) {
    contenedor.innerHTML = '<p class="text-center">No tienes películas favoritas.</p>';
    return;
  }

  favoritos.forEach(({ id, title, poster }) => {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'card-favorito mb-4';
  tarjeta.dataset.id = id;

  tarjeta.innerHTML = `
    <img src="${poster}" alt="${title}" />
    <div class="card-body">
      <h3 class="card-title">${title}</h3>
      <button class="btn-eliminar" data-id="${id}" data-title="${title}" data-poster="${poster}">
        <i class="fas fa-trash"></i> Eliminar
      </button>
    </div>
  `;

  contenedor.appendChild(tarjeta);
});

  activarEliminar();
}

function eliminarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(fav => String(fav.id) !== String(id));
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarFavoritos();
}
