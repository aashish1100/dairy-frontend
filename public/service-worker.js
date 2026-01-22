self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("Service Worker activated.");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open("dairy-cache").then(cache =>
      cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      })
    )
  );
});
