var cacheName = "all"
var filesToCache = [
    "/index.html",
    "/script.js",
    "manifest.json",
    "/numbers"
]
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("Service worker activate event!")
})