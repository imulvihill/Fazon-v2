// Define un nombre y versión para la caché de la aplicación
const CACHE_NAME = 'fazon-penguin-cache-v1';

// Lista los archivos fundamentales que la aplicación necesita para funcionar sin conexión.
// Incluimos la página principal, el manifiesto, los nuevos íconos PNG y las fuentes.
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Evento 'install': Se dispara cuando el navegador instala el Service Worker.
// Aquí es donde guardamos (cacheamos) los archivos de la aplicación.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_-NAME)
      .then(cache => {
        console.log('Cache abierta y guardando archivos de la aplicación');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': Se dispara cada vez que la aplicación intenta obtener un recurso (una imagen, un archivo, etc.).
// Este código intercepta la petición.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Primero, intenta buscar el recurso en la caché.
    caches.match(event.request)
      .then(response => {
        // Si el recurso se encuentra en la caché (response), lo devuelve directamente sin ir a la red.
        // Si no se encuentra en la caché, realiza la petición a la red (fetch) como lo haría normalmente.
        // Esto es lo que permite que la app funcione sin conexión.
        return response || fetch(event.request);
      })
  );
});
