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
    new RegExp("/.*"),
    new workbox.strategies.NetworkFirst()
);

function showNotification(event) {
    return new Promise(resolve => {
        const {body, title, tag} = JSON.parse(event.data.text());
        self.registration
            .getNotifications({tag})
            .then(() => {
                const icon = "/icons/badges/SuperAlpaka.png";
                return self.registration.showNotification(title, {body, tag, icon})
            })
            .then(resolve)
    });
}

self.addEventListener("push", event => event.waitUntil(showNotification(event)));
