const CACHE_NAME = 'fazon-penguin-cache-v2'; // Incrementamos la versión para forzar la actualización
const urlsToCache = [
    './', // Ruta relativa para la raíz
    './index.html', // Ruta relativa para el archivo principal
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://www.svgrepo.com/show/134449/penguin.svg'
];

// Instalar el Service Worker y guardar los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching files');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Activar el nuevo Service Worker y limpiar cachés antiguas
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
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

