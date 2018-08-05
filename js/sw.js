const staticCacheName = "restaurant-cache-v3";
let urlToCache = [
  "./",
  "./index.html",
  "./restaurant.html",
  "./data/restaurants.json",
  "./js/main.js",
  "./js/dbhelper.js",
  "./js/restaurant_info.js",
  "./css/styles.css",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg"
];

// Cache files upon installation
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
    .open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(urlToCache);
    })
    .catch(function(error) {
      console.log(error);
    })
  );
});

// Delete old cache names
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches
    .keys()
    .then(function(cacheName) {
      return (
        cacheName.startWith("restaurant-") && cacheName != staticCacheName
      );
    })
    .map(function(cacheName) {
      return caches.delete(cacheName);
    })
  );
});

// Return the cached assets if available
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
