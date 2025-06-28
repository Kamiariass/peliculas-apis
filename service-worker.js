var cachePelis = 'cache';

self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker instalado');
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activado');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then((response)=>{
            if(response){
                return response
            }

            const requestToCache = event.request.clone() //Clona la solicitud: una solicitud es un flujo y se puede consumir solo una vez

            return fetch(requestToCache)
                .then( (response)=>{ // Trata de hacer la solicitud HTTP original según lo previsto
                    if(!response || response.status !== 200){
                        //Si la solicitud falla o el servidor response con un codigo de error, lo devolvemos inmediatamente
                        return response;
                    }

                    const responseToCache = response.clone(); //Nuevamente, clona la respuesta porque necesitamos agregaarla al cache y porque se usa para la respuesta final
                    caches.open(cachePelis) // abre el cache
                        .then((cache)=>{
                            cache.put(requestToCache, responseToCache); //añadimos en el caché
                        });
                    return response;
                })


        })
    );
});

self.addEventListener('push', (e)=>{
    console.log(e)

    let title = "Peliculas App"

    let options = {
        body: "¿Te gustaria compartir nuestra app?",
        icon: "sources/icon/icon500.png",
        vibrate: [100, 50, 100],
        data: {id:1},
        actions: 
        [
            {   'action': 'Si',
                'title' : 'No hay problema!',
                'icon' : 'sources/icon/icon500.png',
                'share' : "https://dreamy-piroshki-8221b6.netlify.app/"
            },
            {   'action': 'No',
                'title' : 'Por ahora no',
                'icon' : 'sources/icon/icon500.png',
            }
        ] 
    }
e.waitUntil(self.registration.showNotification(title, options))

});
