<template>
    <nav class="navigation">
        <div class="branding">
            Jugend hackt App
            <router-link to="/login" v-if="!isLoggedIn"><img class="icon" src="/assets/icons/key.svg" alt="Login"></router-link>
            <router-link to="/user" v-if="isLoggedIn"><img class="icon" src="/assets/icons/user.svg" alt="User"></router-link>
        </div>
        <div class="nav">
            <router-link to="/events"><img class="icon" src="/assets/icons/calendar.svg" alt="Events"></router-link>
            <router-link to="/alpacrash"><img class="icon" src="/assets/icons/clipboard.svg" alt="Alpacrash"></router-link>
            <router-link to="/feed"><img alt="Feed" class="icon" src="/assets/icons/feed.svg"></router-link>
            <router-link to="/packingList"><img class="icon" src="/assets/icons/briefcase.svg" alt="Packing List"></router-link>
            <router-link to="/lostitems"><img class="icon" src="/assets/icons/list.svg" alt="Lost and Found"></router-link>
            <router-link to="/admin" v-if="isAdmin"><img class="icon" src="/assets/icons/command.svg" alt="Admin"></router-link>
            <router-link to="/badges" v-if="isAdmin"><img class="icon" src="/assets/icons/award.svg" alt="Badges"></router-link>
            <router-link to="/coaching"><img class="icon" src="/assets/icons/book-open.svg" alt="Nachhilfe"></router-link>
        </div>
    </nav>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                isAdmin: false,
                isLoggedIn: false
            }
        },
        methods: {
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.isAdmin = xhr.response.isAdmin;
                    this.isLoggedIn = xhr.response.loggedIn;
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
<style scoped>
.branding {
    display: flex;
    justify-content: space-between;
}

.branding .icon {
    align-self: center;
    height: 100%;
    filter: invert(1);
}
</style>
