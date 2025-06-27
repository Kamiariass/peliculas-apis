function actualizarEstadoConexion() {
  const circulo = document.getElementById('estado-circulo');
  const texto = document.getElementById('estado-texto');

  if (circulo && texto) {
    if (navigator.onLine) {
      circulo.style.backgroundColor = '#28a745'; // verde
      texto.textContent = 'Online';
    } else {
      circulo.style.backgroundColor = '#dc3545'; // rojo
      texto.textContent = 'Offline';
    }
  }
}

// Escuchamos los eventos de conexión/desconexión
window.addEventListener('online', actualizarEstadoConexion);
window.addEventListener('offline', actualizarEstadoConexion);

// Al cargar la página, actualiza el estado
document.addEventListener('DOMContentLoaded', actualizarEstadoConexion);
