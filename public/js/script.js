httpVueLoader.register(Vue, 'js/components/navigation.vue');

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("js/service-worker.js");
}


const routes = [
  { path: "/", component: httpVueLoader('views/events.vue')},
  { path: "/login", component: httpVueLoader('views/login.vue')}
]

const router = new VueRouter({
  routes
});

let app = new Vue({
  router,
  el: "#app"
});
