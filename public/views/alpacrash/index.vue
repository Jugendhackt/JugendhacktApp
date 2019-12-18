<template>
    <div>
        <div class="card" v-for="ev in events" :key="ev.id" @click="openEvent(ev.name)">
            <h2>Jugend hackt {{ev.name}}</h2>
            <img :src="getBadge(ev.name)" alt="A great badge" class="badge-img">
        </div>
        <div class="card creator-btn" v-if="user.isAdmin">
            <img src="/assets/icons/plus.svg" alt="Add event" @click="openCreator()">
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                events: [],
                user: {}
            }
        },

        methods: {
            getEvents() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.events = xhr.response;
                    this.$root.loading = false;
                };
                xhr.open('GET', '/alpacrash/');
                xhr.responseType = "json";
                xhr.send();
            },
            getBadge(name) {
                return `https://jhbadge.de/?evt=${name}&type=started-at`;
            },
            openEvent(ev) {
                this.$router.push(`/alpacrash/${ev}`);
            },
            capitalizeFirstLetter(s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            },
            getUserInfo() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.user = xhr.response;
                };
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
            openCreator() {
                this.$router.push('/alpacrash/admin')
            },
        },

        beforeMount() {
            this.getEvents();
            this.getUserInfo();
        }
    }
</script>

<style scoped>
    .card {
        position: relative;
        cursor: pointer;
    }

    .badge-img {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .creator-btn {
        display: flex;
        justify-content: space-around;
    }

    .creator-btn img {
        cursor: pointer;
        display: block;
        background: #00a5dc;
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }
</style>
