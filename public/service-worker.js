const name = 'Jugendhackt';
const filesToCache = [
      '/',
      '/index.html',
      '/css/style.css',
      '/js/script.js',
      '/js/vue.js',
      '/js/vue-router.js',
      '/js/vue-loader.js',
      '/views/events.vue',
      '/views/login.vue',
      '/js/components/navigation.vue',
      '/service-worker.js',
      '/api/',
      '/api/events',
      '/api/twitter',
      '/api/hackdash',
      '/api/events/',
      '/api/twitter/',
      '/api/hackdash/',
      '/assets/icons/calendar.svg',
      '/assets/icons/key.svg',
      '/assets/icons/clipboard.svg',
      '/assets/icons/arrow-down.svg',
      '/assets/icons/briefcase.svg',
      '/assets/icons/list.svg',
      '/assets/icons/badges/SuperAlpaka.png'
];

self.addEventListener('install', event => {
  console.log("installing");
  event.waitUntil(
    caches.open(name).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log("activating");
  event.waitUntil(
   caches.keys().then(cachedFiles => {
     return Promise.all(cachedFiles.map(cacheFile => {
       if (cacheFile !== name) {
         console.log('Removing Cached Files from Cache - ', cacheFile);
         return caches.delete(cacheFile);
       }
     }));
   })
 );
});

self.addEventListener('fetch', event => {
  console.log("fetching");
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
