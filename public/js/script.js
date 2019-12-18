import Vue from "vue";
import VueRouter from "vue-router";
import App from "../views/App.vue";

Vue.use(VueRouter);

const routes = [
    {path: "/", redirect: "/events"},
    {path: "/events", component: () => import("/views/events.vue")},
    {path: "/login", component: () => import("/views/login.vue")},
    {path: "/hackdash", component: () => import("/views/hackdash.vue")},
    {path: "/feed", component: () => import("/views/feed.vue")},
    {path: "/lostitems", component: () => import("/views/lostitems.vue")},
    {path: "/packinglist", component: () => import("/views/packinglist.vue")},
    {path: "/admin", component: () => import("/views/admin.vue")},
    {path: "/user", component: () => import("/views/user.vue")},
    {path: "/badges", component: () => import("/views/badges.vue")},
    {path: "/test", component: () => import("/views/testing.vue")},
    {path: "/info", component: () => import("/views/infos.vue")},
    {path: "/alpacrash", component: () => import("/views/alpacrash/index.vue")},
    {path: "/alpacrash/admin", component: () => import("/views/alpacrash/admin.vue")},
    {path: "/alpacrash/:event/creator", component: () => import("/views/alpacrash/creator.vue")},
    {path: "/alpacrash/:event", component: () => import("/views/alpacrash/event.vue")},
    {path: "/alpacrash/:event/:year", component: () => import("/views/alpacrash/event-year.vue")},
    {path: "/alpacrash/:event/:year/:project", component: () => import("/views/alpacrash/project.vue")},
    {path: "*", component: () => import("/views/404.vue")},
    {
        path: "/coaching", component: () => import("/views/coaching/index.vue"),
        children: [
            {
                path: "",
                redirect: "helping"
            },
            {
                path: "asking",
                component: () => import("/views/coaching/asking.vue")
            },
            {
                path: "helping",
                component: () => import("/views/coaching/helping.vue")
            }
        ]
    },
];

const router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    mode: "history"
});

let app = new Vue({
    router,
    data: function () {
        return {
            loading: false,
            current_user: false
        }
    },
    beforeRouteLeave() {
        this.$root.loading = false;
    },
    render: h => h(App),
    el: "#app"
});

/**
 * NOTIFICATIONS AND CACHING
 */
let swRegistration;
(async () => await Notification.requestPermission())();

if ("serviceWorker" in navigator) {
    console.log("Service worker support!");
    navigator.serviceWorker.register("/service-worker.js", {scope: "/"})
        .then(res => {
            swRegistration = res;
            subscribeUser();
        })
} else console.warn("No service worker support!");

function base64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeServer(subscription) {
    if (subscription) {
        const jsonSubscription = JSON.stringify(subscription);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/push/subscribe");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onload = function () {
            console.log(this.responseText);
        };
        xhr.send(jsonSubscription);
    }
}

function subscribeUser() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/push/public");
    xhr.onload = function () {
        const applicationServerKey = base64ToUint8Array(this.responseText);
        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(subscription => {
                console.log("Subscribed successfully!");
                console.log(subscription);
                subscribeServer(subscription);
            })
            .catch(err => {
                if (Notification.permission === "denied") {
                    console.warn("Permission for notifications was denied :(");
                } else {
                    console.error("Failed to subscribe the user: ", err);
                }
            });
    };
    xhr.send();
}
