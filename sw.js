// sw.js - Service Worker pour TrafficFlow
const CACHE_NAME = 'trafficflow-v1';

// Fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/index.html',
  '/statistiques',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker : Installation en cours...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker : Mise en cache des fichiers');
        return cache.addAll(urlsToCache);
      })
  );
});

// Stratégie de récupération (Cache First)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

console.log('Service Worker TrafficFlow activé avec succès');