self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // Biarkan fetch lewat secara normal
  e.respondWith(fetch(e.request));
});
