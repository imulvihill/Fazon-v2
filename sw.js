const CACHE_NAME = 'fazon-penguin-cache-v1';
const urlsToCache = [
    '/',
    '/index.html' // Asegúrate de que este nombre coincida con tu archivo HTML principal
];

// Instalar el Service Worker y guardar los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar las solicitudes de red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la respuesta está en la caché, la devuelve
                if (response) {
                    return response;
                }
                // Si no, la busca en la red
                return fetch(event.request);
            })
    );
});
