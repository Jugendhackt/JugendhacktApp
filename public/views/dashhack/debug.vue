<template>
    <div>
        <div class="card">
            <!-- Add event -->
            <h2 class="name">Add event:</h2>
            <form @submit="addEvent()">
                <label for="event_name">Name:</label>
                <input type="text" id="event_name" v-model="event.name" required>
                <label for="event_year">Year:</label>
                <input type="number" id="event_year" v-model="event.year" required>
                <button type="submit" class="button primary">Add event</button>
            </form>
        </div>
        <div class="card">
            <h2 class="name">Add project to event</h2>
            <form @submit="addProject()" enctype="multipart/form-data" id="project-upload-form">
                <div>
                    <label for="event_id">Event: </label>
                    <select id="event_id" v-model="project.eventId">
                        <option v-for="event in events" :value="event.id">{{event.name}}: {{event.year}}</option>
                    </select>
                </div>
                <label for="project_title">Title:</label>
                <input type="text" id="project_title" v-model="project.title" required>
                <label for="project_image">Image: <!-- Image upload--></label>
                <input type="file" id="project_image" v-model="project.img_name" required>
                <div>
                    <label for="project_desc">Description:</label> <br>
                    <textarea id="project_desc" v-model="project.description" required> </textarea>
                </div>
                <br>
                <label for="project_link">Link:</label>
                <input type="text" id="project_link" v-model="project.link" required>
                <button type="submit" class="button primary">Add project</button>
            </form>
        </div>
        <div class="card">
            <h2 class="name">Add user to project</h2>
            <form @submit="addUser()">
                <div>
                    <label for="project_id">Project: </label>
                    <select id="project_id" v-model="user.projectId">
                        <option v-for="project in projects" :value="project.id">{{project.title}}</option>
                    </select>
                </div>
                <div>
                    <label for="user_id">User: </label>
                    <select id="user_id" v-model="user.userId">
                        <option v-for="user in users" :value="user.id">{{user.email}}</option>
                    </select>
                </div>
                <button type="submit" class="button primary">Add user to project</button>
            </form>
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
        <div class="card">
            <ul>
                <li v-for="u in users">{{u}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                event: {
                    name: "",
                    year: (new Date()).getFullYear()
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
            addEvent() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('name', this.event.name);
                formData.append('year', this.event.year);
                xhr.onload = () => console.log(xhr.response);
                xhr.open("PUT", "/dashhack/");
                xhr.responseType = 'json';
                xhr.send(formData);
                this.getEvents();
            },
            addProject() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('event_id', this.project.eventId);
                formData.append('title', this.project.title);
                formData.append("img", document.getElementById("project_image").files[0]);
                formData.append('description', this.project.description);
                formData.append('link', this.project.link);
                xhr.onload = () => console.log(xhr.response);
                xhr.open("PUT", "/dashhack/projects");
                xhr.responseType = 'json';
                xhr.send(formData);
                this.getProjects();
            },
            addUser() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('project_id', this.user.projectId);
                formData.append('user_id', this.user.userId);
                xhr.onload = () => console.log(xhr.response);
                xhr.open("PUT", "/dashhack/users");
                xhr.responseType = 'json';
                xhr.send(formData);
                this.getProjects();
            },
            getEvents() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.events = xhr.response;
                xhr.open('GET', '/dashhack/all');
                xhr.responseType = "json";
                xhr.send();
            },
            getProjects() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.projects = xhr.response;
                xhr.open('GET', '/dashhack/projects/all');
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
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.isAdmin = xhr.response.isAdmin;
                    if (!this.isAdmin) this.$router.replace('/');
                };
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
        },

        beforeMount() {
            this.getEvents();
            this.getProjects();
            this.getUsers();
            this.checkAdmin();
        }
    }
</script>

<style scoped>

    .name {
        font-size: 1.4em;
    }

    input {
        background: #fff;
        border: 3px solid #000;
        display: block;
        padding: 0.3em;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 25px;
        margin-top: 5px;
    }

    .button {
        display: inline-block;
    }

    .image img {
        height: 100px;
        max-width: 100%;
        width: auto;
    }

</style>
