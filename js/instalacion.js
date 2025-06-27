document.addEventListener('DOMContentLoaded', () => {
  let deferredPrompt;
  const btnInstalar = document.getElementById('btn-instalar');

  console.log('Botón instalar:', btnInstalar);

  if (!btnInstalar) {
    console.warn('No se encontró el botón de instalar en el DOM');
    return;
  }

  btnInstalar.style.display = 'none'; // Oculto al inicio

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('Evento beforeinstallprompt detectado');
    btnInstalar.style.display = 'inline-block'; // Mostrar el botón
  });

  btnInstalar.addEventListener('click', async () => {
    if (!deferredPrompt) {
      console.log('No hay evento deferredPrompt disponible');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }
    deferredPrompt = null;
    btnInstalar.style.display = 'none';
  });

  window.addEventListener('appinstalled', () => {
    console.log('App instalada');
    btnInstalar.style.display = 'none';
  });
});
