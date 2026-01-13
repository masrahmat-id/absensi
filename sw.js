// Versi 1.0.1 - Terintegrasi dengan Offline Fallback
const CACHE_NAME = 'offline-v1.0.2';
const OFFLINE_URL = '/offline.html'; // Pastikan file ini ada di root folder Anda

// 1. Tahap Install
self.addEventListener('install', (e) => {
  self.skipWaiting();
  console.log('Service Worker: Installed Version 1.0.1');

  // Menyimpan halaman offline ke cache saat instalasi
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching offline page');
      return cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    })
  );
});

// 2. Tahap Fetch (Logika Inti untuk mengatasi ERR_FAILED)
self.addEventListener('fetch', (e) => {
  // Hanya menangani navigasi halaman (ketika user buka link/refresh)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => {
        // Jika fetch gagal (internet mati), ambil offline.html dari cache
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match(OFFLINE_URL);
        });
      })
    );
  } else {
    // Untuk file lain (gambar, css, js), biarkan tetap menggunakan jaringan
    e.respondWith(fetch(e.request));
  }
});
