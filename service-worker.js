const CACHE_NAME = 'prayers-cache-v21';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/prayer.html',
  '/style.css',
  '/app.js',
  '/prayer.js',
  '/prayers.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});