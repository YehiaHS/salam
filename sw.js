const CACHE_NAME = 'salam-v1';
const ASSETS = [
    './',
    './index.html',
    './icon.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Amiri&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                // Optionally cache new API requests here if desired
                return fetchResponse;
            });
        }).catch(() => {
            // Return cached index.html for navigation requests when offline
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});
