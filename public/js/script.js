httpVueLoader.register(Vue, "js/components/navigation.vue");
httpVueLoader.register(Vue, "js/components/v-image.vue");

let app;

const routes = [
    {path: "/", component: httpVueLoader("views/events.vue")},
    {path: "/login", component: httpVueLoader("views/login.vue")},
    {path: "/hackdash", component: httpVueLoader("views/hackdash.vue")},
    {path: "/feed", component: httpVueLoader("views/feed.vue")},
    {path: "/lostitems", component: httpVueLoader("views/lostitems.vue")},
    {path: "/packinglist", component: httpVueLoader("views/packinglist.vue")},
    {path: "/admin", component: httpVueLoader("views/admin.vue")},
    {path: "/user", component: httpVueLoader("views/user.vue")},
    {path: "/badges", component: httpVueLoader("views/badges.vue")},
    {path: "/test", component: httpVueLoader("views/testing.vue")},
    {path: "/info", component: httpVueLoader("views/infos.vue")},
    {path: "/404", component: httpVueLoader("views/404.vue")},
    {path: "*", component: httpVueLoader("views/404.vue")},
    {path: "/nachhilfe", component: httpVueLoader("views/Nachhilfe.vue")}
];

const router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
});

app = new Vue({
    data: function () {
        return {
            loading: false,
            current_user: false
        }
    },
    beforeRouteLeave() {
        this.$root.loading = false;
    },
    router,
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
