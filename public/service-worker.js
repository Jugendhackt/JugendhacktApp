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

// const socket = new WebSocket("ws://localhost:9001/wss/"); // TODO: More dynamic ws testing
const socket = new WebSocket("wss://jh.marvinborner.de/wss/");
socket.onopen = e => {
    console.log("Websocket Connection established");
    socket.send(JSON.stringify({"connected": true}));
};

socket.onmessage = async event => {
    console.log(`Websocket received from server: ${event.data}`);
    await self.registration.showNotification("Jugend hackt App", {
        body: event.data
    })
};

socket.onclose = event => {
    if (event.wasClean) {
        console.log(`Websocket closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.warn("Websocket disconnected!");
    }
};

socket.onerror = async error => {
    console.error("Websocket failed", error);
    await self.registration.unregister()
};
