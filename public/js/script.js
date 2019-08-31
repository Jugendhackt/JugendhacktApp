if ('serviceWorker' in navigator) {
  console.log("Service worker support!");
  navigator.serviceWorker.register("/service-worker.js", { scope: "/" } );
} else console.warn("No service worker support!");


httpVueLoader.register(Vue, 'js/components/navigation.vue');

const routes = [
  { path: "/", component: httpVueLoader('views/events.vue')},
  { path: "/login", component: httpVueLoader('views/login.vue')},
  { path: "/hackdash", component: httpVueLoader('views/hackdash.vue')}
]

const router = new VueRouter({
  routes
});

let app = new Vue({
  router,
  el: "#app"
});
