self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker instalado');
  self.skipWaiting(); // activa inmediatamente
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activado');
});

self.addEventListener('fetch', (event) => {
  // Por ahora no interceptamos, solo dejamos pasar
  return;
});
