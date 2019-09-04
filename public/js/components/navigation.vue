<template>
    <nav class="navigation">
        <div class="branding">
            Jugendhackt App
        </div>
        <div class="nav">
            <router-link to="/"><img class="icon" src="assets/icons/calendar.svg" alt="Events"></router-link>
            <router-link to="/hackdash"><img class="icon" src="assets/icons/clipboard.svg" alt="Hackdash"></router-link>
            <router-link to="/feed"><img alt="Feed" class="icon" src="assets/icons/feed.svg"></router-link>
            <router-link to="/packingList"><img class="icon" src="assets/icons/list.svg" alt="Packing List"></router-link>
            <router-link to="/lostitems"><img class="icon" src="assets/icons/briefcase.svg" alt="Lost and Found"></router-link>
            <router-link to="/login"><img class="icon" src="assets/icons/key.svg" alt="Login"></router-link>
            <router-link to="/admin" v-if="isAdmin"><img class="icon" src="assets/icons/command.svg" alt="Admin"></router-link>
        </div>
    </nav>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                isAdmin: false,
            }
        },
        methods: {
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    // TODO: Validate security: check if user can somehow change this variable
                    this.isAdmin = xhr.response.isAdmin;
                };
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            }
        },
        beforeMount() {
            this.checkAdmin();
        }
    }
</script>
