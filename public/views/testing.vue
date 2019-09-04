<template>
    <div>
        <label for="data"></label>
        <input id="data" type="text" v-model="data">
        <input id="submit" type="button" v-on:click="send()" value="submit">
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                data: ""
            }
        },
        methods: {
            send() {
                this.closePreviousConnections();
                const socket = new WebSocket("wss://jh.marvinborner.de/wss/");
                socket.onopen = e => {
                    socket.send(JSON.stringify({"admin": true}));
                    socket.send(JSON.stringify({"data": this.data}));
                    socket.close();
                };
            },
            closePreviousConnections() {
                navigator.serviceWorker.getRegistrations().then(function (registrations) {
                    for (let registration of registrations) {
                        registration.unregister()
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
