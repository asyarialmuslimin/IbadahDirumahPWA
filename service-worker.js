const CACHE_NAME = "myappcache";
const urlsToCache = [
    "/",
    "/index.html",
    "/assets/css/style.css",
    "/assets/css/materialize.css",
    "/assets/css/materialize.min.css",
    "/assets/data/quran.json",
    "/assets/data/doa.json",
    "/assets/data/cerita.json",
    "/assets/data/quran/alfatihah.json",
    "/assets/data/quran/yaasin.json",
    "/assets/data/quran/assajdah.json",
    "/assets/data/quran/alfath.json",
    "/assets/data/quran/almulk.json",
    "/assets/data/doa/niatpuasa.json",
    "/assets/data/doa/bukapuasa.json",
    "/assets/data/doa/dhuha.json",
    "/assets/data/doa/tahajud.json",
    "/assets/data/doa/tarawih.json",
    "/assets/data/doa/witir.json",
    "/assets/font/IsepMisbah.ttf",
    "/assets/images/arafah.png",
    "/assets/images/bukapuasa.png",
    "/assets/images/doa.png",
    "/assets/images/doadhuha.png",
    "/assets/images/doatahajud.png",
    "/assets/images/doatarawih.png",
    "/assets/images/doawitir.png",
    "/assets/images/hadist.png",
    "/assets/images/logo.png",
    "/assets/images/menu.svg",
    "/assets/images/niatdhuha.png",
    "/assets/images/niattahajud.png",
    "/assets/images/niattarawih.png",
    "/assets/images/niatwitir.png",
    "/assets/images/quran.png",
    "/assets/images/rajab.png",
    "/assets/images/romadhon.png",
    "/assets/images/syaban.png",
    "/assets/images/syawal.png",
    "/assets/images/photo.png",
    "/assets/images/tarwiyah.jpg",
    "/assets/js/materialize.js",
    "/assets/js/materialize.min.js",
    "/assets/js/main.js",
    "assets/images/icons/icon-72x72.png",
    "assets/images/icons/icon-96x96.png",
    "assets/images/icons/icon-128x128.png",
    "assets/images/icons/icon-144x144.png",
    "assets/images/icons/icon-152x152.png",
    "assets/images/icons/icon-192x192.png",
    "assets/images/icons/icon-384x384.png",
    "assets/images/icons/icon-512x512.png",
    "/manifest.json"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});


self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});