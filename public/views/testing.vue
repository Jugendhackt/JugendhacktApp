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
                const socket = new WebSocket("wss://jh.marvinborner.de/wss/");
                socket.onopen = e => {
                    socket.send(JSON.stringify({"admin": true}));
                    socket.send(JSON.stringify({"data": this.data}));
                    socket.close();
                };
            }
        }
    }
</script>

<style scoped>

</style>
