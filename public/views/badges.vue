<template>
    <div>
        <div class="card">
            <Badges :user="this.current_user" class="board-view" v-if="this.badgesOpen"></Badges>
            <div :class="{ hide: badgesOpen}">
                <h2>Badges for everyone! \o/</h2>
                <ul>
                    <li v-for="user in users">
                        <span>{{user.full_name}}</span> - <span>{{user.email}}</span>
                        <button @click="setActive(user.email)">Choose</button>
                    </li>
                </ul>
            </div>
        </div>
        <span :class="{ hide : !badgesOpen}" class="back">
            <img @click="current_user = undefined" alt="Back" id="backBtn" src="/assets/icons/arrow-down.svg">
        </span>
    </div>
</template>

<script>
    const Badges = httpVueLoader("/js/components/badges.vue");
    module.exports = {
        data: function () {
            return {
                users: [],
                badges: [],
                current_user: undefined,
                isAdmin: false
            }
        },
        methods: {
            fetchUsers() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.users = xhr.response
                };
                xhr.responseType = "json";
                xhr.open("GET", "/user/getAll");
                xhr.send();
            },
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.isAdmin = xhr.response.isAdmin;
                    if (!this.isAdmin) location.replace('/');
                };
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
            setActive(email) {
                this.current_user = email;
            }
        },
        computed: {
            badgesOpen() {
                return this.current_user !== undefined;
            }
        },
        beforeMount() {
            this.checkAdmin();
            this.fetchUsers();
        },
        components: {
            Badges
        }
    }
</script>

<style scoped>
    div.hide {
        height: 0 !important;
        overflow: hidden;
    }

    .back {
        position: fixed;
        bottom: 66px;
        display: inline;
        text-align: center;
        transition: bottom ease 200ms;
        left: 0;
        right: 0;
        cursor: pointer;
        z-index: 1;
    }

    .back img {
        background: #00a5dc;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        fill: #fff;
        transform: rotateZ(90deg);
        box-shadow: 0 0 12px #cecece;
        transition: transform 300ms ease;
    }

    .back.hide img {
        transform: rotateZ(-90deg);
    }

    .back.hide {
        bottom: -80px;
    }

    .card {
        margin-top: 4px;
        margin-bottom: 4px;
        box-shadow: 0 0 6px #cecece;
    }

    .card:last-child {
        margin-bottom: 50px;
    }
</style>
