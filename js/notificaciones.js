// Solicitar permiso para notificaciones push
function solicitarPermisoNotificaciones() {
  if (!('Notification' in window)) {
    console.log('Este navegador no soporta notificaciones.');
    return;
  }

  Notification.requestPermission().then(permission => {
    console.log('Permiso de notificaciones:', permission);
  });
}

// Mostrar notificación simple para pruebas
function mostrarNotificacionPrueba() {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.showNotification('Notificación de prueba', {
          body: '¡Funciona la notificación push!',
          icon: 'sources/icon/icon192.png'
        });
        console.log('Notificación push mostrada');
      } else {
        console.log('No hay registro de Service Worker para mostrar notificación');
      }
    });
  } else {
    console.log('Permiso de notificaciones no concedido');
  }
}

// Para probar: escuchar mensaje push (simulado)
self.addEventListener && self.addEventListener('push', event => {
  console.log('Push recibido:', event);
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  solicitarPermisoNotificaciones();

  // Por ejemplo, un botón para probar notificaciones (agregarlo en HTML)
  const btnNotif = document.getElementById('btn-notificacion-prueba');
  if (btnNotif) {
    btnNotif.addEventListener('click', mostrarNotificacionPrueba);
  }
});
