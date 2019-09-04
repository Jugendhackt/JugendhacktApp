<template>
    <div>
        <div class="card" v-for="post in feed">
            <h3>{{ post.name }} @ <small>{{ new Date(post.time * 1000).toLocaleString("de") }}</small></h3>
            <p>{{ post.text }}</p>
            <v-image :src="picture" alt="" v-for="picture in post.pictures"></v-image>
            <img :src="emoji" alt="" v-for="emoji in post.emojis" class="emoji-image">
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                feed: [{
                    "name": "Rainbow alpacas fetching the feed!",
                    "text": "The alpacas are currently chasing the requested data - please wait a bit.",
                    "time": (new Date("04/20/1337 13:37:42")).getTime() / 1000,
                    "pictures": [],
                    "emojis": []
                }],
            }
        },
        methods: {
            fetchTwitter() {
                this.$root.loading = true;
                return new Promise(resolve => {
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", () => {
                        this.feed = xhr.response;
                        console.log(xhr.response, this.feed);
                        resolve(this.feed)
                    });
                    xhr.open("GET", "/api/twitter");
                    xhr.responseType = "json";
                    xhr.send();
                })
            },
            fetchZulip() {
                return new Promise(resolve => {
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", () => {
                        this.$root.loading = false;
                        this.feed = this.feed.concat(xhr.response);
                        resolve(this.feed)
                    });
                    xhr.open("GET", "/api/zulip");
                    xhr.responseType = "json";
                    xhr.send();
                })
            }
        },
        mounted() {
            this.fetchTwitter()
                .then(_ => this.fetchZulip()
                    .then(_ => this.feed = this.feed.sort((a, b) => b.time - a.time)));
        }
    }
</script>

<style scoped>
    .card {
        padding-bottom: 16px;
        margin: 10px;
    }

    img {
        cursor: pointer;
        padding: 5px;
        height: 100px;
    }

    .emoji-image {
        cursor: default;
        height: 25px;
    }
</style>
