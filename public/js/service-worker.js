var name = 'Jugendhackt App',
    filesToCache = [
      '/index.html',
      '/css/style.css',
      '/js/script.js',
      '/js/vue.js',
      '/js/vue-router.js',
      '/js/vue-loader.js',
      '/views/events.vue',
      '/views/login.vue',
      '/js/components/navigation.vue',
      '/js/service-worker.js',
      '/api/',
      '/api/events',
      '/api/twitter',
      '/api/hackdash',
      '/api/events/',
      '/api/twitter/',
      '/api/hackdash/'
    ];

self.addEventListener('install', function (event) {
  console.log("installing");
  event.waitUntil(
    caches.open(name).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log("activating");
  event.waitUntil(
   caches.keys().then(function(cachedFiles) {
     return Promise.all(cachedFiles.map(function(cacheFile) {
       if (cacheFile !== name) {
         console.log('Removing Cached Files from Cache - ', cacheFile);
         return caches.delete(cacheFile);
       }
     }));
   })
 );
});


self.addEventListener('fetch', function (event) {
  console.log("fetching");
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
