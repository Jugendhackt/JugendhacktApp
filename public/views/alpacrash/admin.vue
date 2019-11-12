<template>
    <div>
        <div class="card">
            <h1>Alpacrash - Admin interface</h1>
        </div>
        <div class="card">
            <form @submit="addEvent()">
                <label for="event-name">Name: </label>
                <input id="event-name" v-model="newEvent.name" type="text">
                <label for="event-year">Year: </label>
                <input id="event-year" v-model="newEvent.year" type="text">
                <button type="submit" class="button primary">Add event</button>
            </form>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                isAdmin: false,
                newEvent: {}
            }
        },

        methods: {
            addEvent() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('name', this.newEvent.name);
                formData.append('year', this.newEvent.year);
                xhr.onload = () => console.log(xhr.response);
                xhr.open("POST", "/alpacrash/");
                xhr.responseType = 'json';
                xhr.send(formData);
                this.getEvents();
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
            this.checkAdmin();
        }
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
