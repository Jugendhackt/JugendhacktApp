const name = "Jugendhackt";
const filesToCache = [
    "/",
    "/jugendhackt.webmanifest",
    "/index.html",
    "/service-worker.js",

    "/css/style.css",

    "/js/script.js",
    "/js/vue.js",
    "/js/vue-loader.js",
    "/js/vue-router.js",

    "/views/events.vue",
    "/views/feed.vue",
    "/views/hackdash.vue",
    "/views/login.vue",
    "/views/lostitems.vue",
    "/views/packinglist.vue",

    "/api/",
    "/api/events",
    "/api/twitter",
    "/api/hackdash",
    "/api/events",
    "/api/twitter",
    "/api/hackdash",
    "/api/zulip",

    "/assets/icons/arrow-down.svg",
    "/assets/icons/briefcase.svg",
    "/assets/icons/calendar.svg",
    "/assets/icons/clipboard.svg",
    "/assets/icons/feed.svg",
    "/assets/icons/key.svg",
    "/assets/icons/list.svg",
    "/assets/icons/badges/SuperAlpaka.png",
    "/assets/images/default-background.png"
];

self.addEventListener("install", event => {
    console.log("installing");
    event.waitUntil(
        caches.open(name).then(cache => {
            console.log("Added files to cache!");
            return cache.addAll(filesToCache)
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(name).then(cache => {
            return cache.match(event.request.url).then(response => {
                if (response) {
                    console.log("Fetching files from cache!");
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    return cache.match("/index.html");
                }

                return fetch(event.request).then(response => {
                    cache.put(event.request, response.clone());
                    console.log("Fetching files from internet!");
                    return response;
                });
            });
        })
    )
});
