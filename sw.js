const CACHE_NAME = 'ravn-v1';
const ASSETS = [
  './',
  './index.html',
  './dist/ui.css',
  './dist/themes.css',
  './dist/ui.js',
  './logo.png'
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
      return response || fetch(event.request);
    })
  );
});
