<template>
    <div>
        <div class="card">
            <h2 class="name">Add project to event</h2>
            <form @submit="addProject()" enctype="multipart/form-data" id="project-upload-form">
                <div>
                    <label for="event_id">Event: </label>
                    <select id="event_id" v-model="creatorForm.eventId">
                        <option v-for="event in events" :value="computeEventPath(event)">{{event.name}}: {{event.year}}</option>
                    </select>
                </div>
                <label for="project_title">Title:</label>
                <input type="text" id="project_title" v-model="creatorForm.title" required>
                <label for="project_image">Image:</label>
                <input type="file" id="project_image" v-model="creatorForm.img_name">
                <div>
                    <label for="project_desc">Description:</label> <br>
                    <textarea id="project_desc" v-model="creatorForm.description" required> </textarea>
                </div>
                <label for="project_link">Link:</label>
                <input type="text" id="project_link" v-model="creatorForm.link" required>
                <button type="submit" class="button primary">Add project</button>
            </form>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                user: {},
                events: [],
                creatorForm: {
                    eventId: -1,
                    title: "",
                    img_name: "",
                    description: "",
                    link: ""
                }
            }
        },

        methods: {
            getEvents() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.events = xhr.response;
                xhr.open('GET', `/alpacrash/${this.$route.params.event}`);
                xhr.responseType = "json";
                xhr.send();
            },
            addProject() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('title', this.creatorForm.title);
                formData.append("img", document.getElementById("project_image").files[0]);
                formData.append('description', this.creatorForm.description);
                formData.append('link', this.creatorForm.link);
                xhr.onload = () => console.log(xhr.response);
                xhr.open("POST", `/alpacrash/${this.creatorForm.eventId}`);
                xhr.responseType = 'json';
                xhr.send(formData);
            },
            getUserInfo() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.user = xhr.response;
                    if (!this.user.isVerified) this.$router.replace('/');
                };
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
            computeEventPath(event) {
                return `${event.name}/${event.year}`;
            },
        },

        beforeMount() {
            this.getEvents();
            this.getUserInfo();
        },
    }
</script>

<style scoped>

    input, textarea {
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
</style>
