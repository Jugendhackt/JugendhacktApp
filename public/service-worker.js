importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
    console.log("Workbox init");
} else {
    console.warn("Workbox does not work! :O");
}

workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/.*'),
    new workbox.strategies.NetworkFirst()
);
