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
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:8080/push/push/");
                xhr.onload = () => console.log(xhr.responseText);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify({
                    "subscription": "all",
                    "message": this.data
                }))
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
