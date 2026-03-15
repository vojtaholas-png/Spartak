const CACHE = 'beach-vb-v1';
const OFFLINE_ASSETS = [
  '/Spartak/beach-volleyball.html',
  '/Spartak/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(OFFLINE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Firebase a Google Fonts — vždy ze sítě
  if (e.request.url.includes('firebase') ||
      e.request.url.includes('googleapis') ||
      e.request.url.includes('gstatic')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Ostatní — cache first, pak síť
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
