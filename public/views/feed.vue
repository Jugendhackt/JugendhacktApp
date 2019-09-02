<template>
    <div>
        <div class="card" v-for="tweet in tweets">
            <h3>{{ tweet.name }} @ <small>{{ new Date(tweet.time * 1000).toLocaleString("de") }}</small></h3>
            <p>{{ tweet.text }}</p>
            <img :src="picture" alt="" v-for="picture in tweet.pictures">
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                tweets: [],
                loading: false
            }
        },
        methods: {
            fetch() {
                this.loading = true;
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("load", () => {
                    this.tweets = xhr.response;
                    this.loading = false;
                });
                xhr.open("GET", "/api/twitter");
                xhr.responseType = "json";
                xhr.send();
            }
        },
        beforeMount() {
            this.fetch();
        }
    }
</script>

<style scoped>
    .card {
        padding-bottom: 16px;
        margin-bottom: 10px;
    }

    img {
        padding: 5px;
        height: 100px;
    }
</style>
