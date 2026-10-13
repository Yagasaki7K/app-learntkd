const CACHE = 'tkd-study-v1';
const CORE = ['./', './techniques/', './belts/', './grading/', './hierarchy/', './terminology/', './settings/', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(request, { ignoreSearch: true }).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      if (response.ok) void caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
      return response;
    }).catch(async () => {
      const url = new URL(request.url);
      if (request.mode === 'navigate') return (await caches.match(url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`)) || (await caches.match('/'))!;
      throw new Error('Offline resource unavailable');
    });
  }));
});
