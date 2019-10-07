<template>
    <div>
        <div class="card" v-for="(event, i) in events" @click="showEvent(i)">
            <div class="event-header">
                <h2>Jugend hackt {{event.name}} {{event.year}}</h2>
                <img :src="getBadge(event.name, event.year)" alt="A great badge" class="badge-img">
            </div>
            <div class="event-projects" v-show="projects.length">
                <span v-for="project in projects">{{project}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                events: [],
                projects: [],
                users: []
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
            getProjects(i) {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.projects = xhr.response;
                xhr.open('GET', `/dashhack/projects?event_id=${i + 1}`);
                xhr.responseType = "json";
                xhr.send();
            },
            getBadge(name, year) {
                return `https://jhbadge.de/?evt=${name}&year=${year}`;
            },
            showEvent(i) {
                this.getProjects(i);
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
    }

    .badge-img {
        position: absolute;
        right: 10px;
        top: 10px;
    }
</style>
