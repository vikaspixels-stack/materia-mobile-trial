// Service Worker

const cacheName = "materia-cache-v3"; //the name of our cache
const cacheAsset = ['../../mv/Dashboard.html',
    '../../app.js',
    '../../img/favicon-192x192.png',
    '../../img/favicon-192x192.png',
    //'../../Scripts/DomainWiseEmailMultiActions.js',
    //'../../Scripts/EmailMapped.js',
    //'../../Scripts/MainEmailGrid4.js',
    //'../../Scripts/EmailMultAction.js'
]; //this is the asset that we want to cache

self.addEventListener("install", (e) => {
    console.log("service worker installed");

    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                console.log("service worker: caching files");
                cache.addAll(cacheAsset);
            })
            .then(() => self.skipWaiting())
    );
});

//self.addEventListener('install', event => {
//    event.waitUntil(
//        caches.open('my-pwa-cache').then(cache => {
//            return cache.addAll([
//                '../../mv/Dashboard.html',
//                '../../app.js?v=1.0.0.3',
//                '../../img/favicon-192x192.png',
//                '../../img/favicon-192x192.png'

//            ]);
//        })
//    );
//});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
self.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        console.log('APP resumed');
        //window.location.reload();
    }
});

//self.addEventListener('load', function (event) {
//    console.log('APP resumed 1');
//});
//self.addEventListener('activate', function (event) {
//    event.waitUntil(
//        caches.keys().then(function (cacheNames) {
//            return Promise.all(
//                cacheNames.filter(function (cacheName) {
//                    // Return true if you want to remove this cache,
//                    // but remember that caches are shared across
//                    // the whole origin
//                }).map(function (cacheName) {
//                    console.log('CacheName = ' + cacheName);
//                    return caches.delete(cacheName);
//                })
//            );
//        })
//    );
//});