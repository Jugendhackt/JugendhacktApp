<template>
    <div>
        <div class="card">
            <!-- Add event -->
            <h2 class="name">Add event:</h2>
            <form @submit="addEvent()">
                <label for="event_name">Name:</label>
                <input type="text" id="event_name" v-model="dh_event.name" required>
                <label for="event_year">Year:</label>
                <input type="number" id="event_year" v-model="dh_event.year" required>
                <button type="submit" class="button primary">Add Event</button>
            </form>
        </div>
        <div class="card">
            <h2 class="name">Add project to Event</h2>
            <form @submit="addProject()">
                <label for="project_id"></label>
                <select name="project_id" id="project_id" v-model="project.eventId">
                    <option v-for="event in events" :value="event.id">{{event.name}}: {{event.year}}</option>
                </select>
                <label for="project_title">Title:</label>
                <input type="text" id="project_title" v-model="project.title" required>
                <label for="project_image">Image: <!-- Image upload--></label>
                <input type="text" id="project_image" v-model="project.img_name" required>
                <label for="project_desc">Description:</label>
                <textarea id="project_desc" v-model="project.description" required> </textarea>
                <label for="project_link">Link:</label>
                <input type="text" id="project_link" v-model="project.link" required>
                <button type="submit" class="button primary">Add Project</button>
            </form>
        </div>
        <div class="card">

        </div>
        <div class="card">
            <ul>
                <li v-for="evt in events">{{evt.name}}:{{evt.year}}</li>
            </ul>
        </div>
        <div class="card">
            <ul>
                <li v-for="p in projects">{{p}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                dh_event: {
                    name: "",
                    year: -1
                },
                events: [],
                project: {
                    eventId: -1,
                    title: "",
                    img_name: "",
                    description: "",
                    link: ""
                },
                projects: [],
                user: {
                    projectId: -1,
                    userId: -1
                },
                users: []
            }
        },

        methods: {
            addEvent: function () {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('name', this.dh_event.name);
                formData.append('year', this.dh_event.year);
                xhr.onload = () => console.log(xhr.response);
                xhr.open("PUT", "/dashhack/");
                xhr.responseType = 'json';
                xhr.send(formData);
                this.getEvents();
            },
            addProject: function () {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('event_id', this.project.eventId);
                formData.append('title', this.project.title);
                formData.append('img_name', this.project.img_name);
                formData.append('description', this.project.description);
                formData.append('link', this.project.link);
                xhr.onload = () => console.log(xhr.response);
                xhr.open("PUT", "/dashhack/projects");
                xhr.responseType = 'json';
                xhr.send(formData);
                this.getProjects();
            },
            getEvents: function () {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.events = xhr.response;
                xhr.open('GET', '/dashhack/');
                xhr.responseType = "json";
                xhr.send();
            },
            getProjects: function () {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.projects = xhr.response;
                xhr.open('GET', '/dashhack/projects/all');
                xhr.responseType = "json";
                xhr.send();
            }
        },

        beforeMount() {
            this.getEvents();
            this.getProjects();
        }
    }
</script>

<style scoped>

</style>
