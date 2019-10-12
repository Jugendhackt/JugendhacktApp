<template>
    <div>
        <div class="card" v-for="ev in events" @click="openEvent(ev)">
            <h2>Jugend hackt {{ev.name}}</h2>
            <img :src="getBadge(ev.name, ev.year)" alt="A great badge" class="badge-img">
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                events: []
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
                xhr.open('GET', '/dashhack/');
                xhr.responseType = "json";
                xhr.send();
            },
            getBadge(name, year) {
                return `https://jhbadge.de/?evt=${name}&type=started-at`;
            },
            openEvent(ev) {
                this.$router.push(`/dashhack/${ev.name}`);
            }
        },

        beforeMount() {
            this.getEvents();
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
</style>
