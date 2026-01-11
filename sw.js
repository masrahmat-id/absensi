// VERSI: 1.0.2 (Ubah angka ini setiap kali kamu update kode di GitHub)
const CACHE_NAME = 'absensi-v1.0.2';

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Langsung aktifkan versi baru
    console.log('SW: Versi baru diinstal');
});

self.addEventListener('activate', (event) => {
    // Hapus cache lama agar HP tidak penuh dan selalu pakai yang baru
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Strategi: Ambil dari internet, jika gagal/offline biarkan browser menangani
    event.respondWith(fetch(event.request));
});
