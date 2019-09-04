<template>
    <div>
        <label for="data"></label>
        <input id="data" type="text" v-model="data">
        <input id="submit" type="button" v-on:click="send()" value="submit">
        <input type="button" v-on:click="unregister()" value="unregister">
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
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "/push/send/");
                xhr.onload = () => console.log(xhr.responseText);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify({
                    "message": {
                        "body": this.data,
                        "title": "Jugend Hackt App",
                        "tag": "Tolle Sachen"
                    }
                }))
            },
            unregister() {
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
