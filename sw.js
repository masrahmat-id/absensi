// Versi 1.0.1
self.addEventListener('install', (e) => {
  self.skipWaiting();
  console.log('Service Worker: Installed Version 1.0.1');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
