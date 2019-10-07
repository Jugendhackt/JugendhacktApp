<template>
    <div>
        <div class="card" v-for="event in events">
            <h2>Jugend hackt {{event.name}} {{event.year}}</h2>
            <img :src="this.getBadge(event.name, event.year)" alt="A great badge" class="badge-img">
        </div>
    </div>
</template>

<script>
    const Board = httpVueLoader("/js/components/newBoard.vue");
    module.exports = {
        data: function () {
            return {
                events: {},
                projects: {},
                users: {}
            }
        },

        methods: {
            getEvents() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.events = xhr.response;
                xhr.open('GET', '/dashhack/');
                xhr.responseType = "json";
                xhr.send();
            },
            getProjects() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.projects = xhr.response;
                xhr.open('GET', '/dashhack/projects?');
                xhr.responseType = "json";
                xhr.send();
            },
            getUsers() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.users = xhr.response;
                xhr.open('GET', '/user/getAll');
                xhr.responseType = "json";
                xhr.send();
            },
            getBadge(name, year) {
                return `https://jhbadge.de/?evt=${name}&year=${year}`;
            }
        },

        beforeMount() {
            this.getEvents();
        },

        components: {
            Board
        }
    }
</script>

<style scoped>

</style>
