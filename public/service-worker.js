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

// const socket = new WebSocket("ws://localhost:8080"); // TODO: More dynamic ws testing
const socket = new WebSocket("wss://jh.marvinborner.de");
socket.onopen = e => {
    console.log("[open] Connection established");
    socket.send(JSON.stringify({"connected": true}));
};

socket.onmessage = async event => {
    console.log(`[message] Data received from server: ${event.data}`);
    await self.registration.showNotification("Jugend hackt App", {
        body: event.data
    })
};

socket.onclose = event => {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.log('[close] Connection died');
    }
};

socket.onerror = error => {
    console.log(`[error] ${error.message}`);
};
