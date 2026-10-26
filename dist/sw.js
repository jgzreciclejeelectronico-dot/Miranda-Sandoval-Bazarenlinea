/* ==========================================================================
   MIRANDA SANDOVAL · BAZAR EN LÍNEA
   Service Worker — caché de la app para uso sin conexión
   ========================================================================== */
"use strict";

var CACHE_NAME = "miranda-bazar-v6";
var CORE_ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./manifest.webmanifest",
  "./assets/favicon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/hero-boutique.jpg",
  "./assets/productos/blusa.jpg",
  "./assets/productos/jeans.jpg",
  "./assets/productos/vestido.jpg",
  "./assets/productos/chamarra.jpg",
  "./assets/productos/falda.jpg",
  "./assets/productos/sueter.jpg",
  "./assets/productos/blazer.jpg",
  "./assets/productos/bolso.jpg",
  "./assets/fonts/fonts.css",
  "./assets/fonts/92zatBhPNqw73oDd4iYl.woff2",
  "./assets/fonts/92zatBhPNqw73oTd4g.woff2",
  "./assets/fonts/92zatBhPNqw73ord4iYl.woff2",
  "./assets/fonts/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYp3tKgS4.woff2",
  "./assets/fonts/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpHtKgS4.woff2",
  "./assets/fonts/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpntKgS4.woff2",
  "./assets/fonts/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2",
  "./assets/fonts/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYrXtKgS4.woff2",
  "./assets/fonts/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-h9M8Efs.woff2",
  "./assets/fonts/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-hdM8Efs.woff2",
  "./assets/fonts/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-htM8Efs.woff2",
  "./assets/fonts/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-iNM8.woff2",
  "./assets/fonts/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-jNM8Efs.woff2"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        CORE_ASSETS.map(function (url) {
          return cache.add(new Request(url, { cache: "reload" })).catch(function () {
            return null;
          });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            if (key !== CACHE_NAME) return caches.delete(key);
            return null;
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url;
  try {
    url = new URL(request.url);
  } catch (error) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put("./index.html", copy).catch(function () {});
          });
          return response;
        })
        .catch(function () {
          return caches.match("./index.html").then(function (cached) {
            return cached || caches.match("./");
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request)
        .then(function (response) {
          if (response && response.ok && response.type === "basic") {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, copy).catch(function () {});
            });
          }
          return response;
        })
        .catch(function () {
          return cached;
        });
    })
  );
});
