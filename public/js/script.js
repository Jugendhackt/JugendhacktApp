if ('serviceWorker' in navigator) {
    console.log("Service worker support!");
    navigator.serviceWorker.register("/service-worker.js", {scope: "/"});
} else console.warn("No service worker support!");

httpVueLoader.register(Vue, 'js/components/navigation.vue');

let app;

const routes = [
    {path: "/", component: httpVueLoader('views/events.vue')},
    {path: "/login", component: httpVueLoader('views/login.vue')},
    {path: "/hackdash", component: httpVueLoader('views/hackdash.vue')},
    {path: "/feed", component: httpVueLoader('views/feed.vue')},
    {path: "/lostitems", component: httpVueLoader('views/lostitems.vue')},
    {path: "/packinglist", component: httpVueLoader('views/packinglist.vue')},
    {path: "/admin", component: httpVueLoader('views/admin.vue')}
];

const router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
});

app = new Vue({
    data: function(){
        return {
            loading: false
        }
    },
    watch: {
        '$route': function(){
            this.loading = false;
        }
    },
    router,
    el: "#app"
});
