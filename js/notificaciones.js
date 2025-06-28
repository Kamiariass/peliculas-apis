if(window.Notification && Notification.permission !== 'denied' ){
    console.log('ejecutando')
    setTimeout('Notification.requestPermission()', 5000);

    new Notification('¡Bienvenido a nuestra pagina!', {
        body: "Peliculas App",
        text: "Navega por nuestra pagina y agrega peliculas a tu lista de favoritos",
        icon: "sources/icon/icon500.png",
        badge: "sources/icon/icon500.png",
    })

}