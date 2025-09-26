// Define un nombre y versión para la caché
const CACHE_NAME = 'fazon-penguin-cache-v1';
// Lista los archivos necesarios para que la app funcione offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://www.svgrepo.com/show/134449/penguin.svg',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Evento de instalación: se abre la caché y se guardan los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: intercepta las peticiones de la red
self.addEventListener('fetch', event => {
  event.respondWith(
    // Intenta encontrar el recurso en la caché
    caches.match(event.request)
      .then(response => {
        // Si se encuentra en caché, lo devuelve. Si no, lo busca en la red.
        return response || fetch(event.request);
      })
  );
});
