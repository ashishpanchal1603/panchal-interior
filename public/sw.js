const CACHE_NAME = "panchal-interior-cache-v1";

const PRECACHE_ASSETS = [
  "/",
  "/about",
  "/services",
  "/products",
  "/projects",
  "/blog",
  "/contact",
  "/icon-192.png",
  "/icon-512.png",
  "/images/hero.png",
  "/images/modular_kitchen.png",
  "/images/sofa_set.png",
  "/images/l_shape_sofa.png",
  "/images/tv_unit.png",
  "/images/wardrobe.png",
  "/images/wooden_bed.png"
];

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Stale-While-Revalidate caching strategy)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Skip chrome extensions or other protocol requests
  if (!url.protocol.startsWith("http")) return;

  // Bypass service worker caching on localhost (development environment)
  if (
    self.location.hostname === "localhost" ||
    self.location.hostname === "127.0.0.1" ||
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1"
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch updated content in background to refresh cache
        event.waitUntil(
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.status === 200) {
                return caches.open(CACHE_NAME).then((cache) => {
                  return cache.put(event.request, networkResponse);
                });
              }
            })
            .catch(() => {}) // Ignore background network errors
        );
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
              return cache.put(event.request, responseToCache);
            })
          );

          return networkResponse;
        })
        .catch(() => {
          // Fallback to home page if navigation fails offline
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});
