<template>
    <div>
        <img :src="badge.image" @click="giveBadge(user, badge)" v-for="badge in badges"><br>
    </div>
</template>

<script>
    module.exports = {
        props: ["user"],
        data: function () {
            return {
                badges: {},
            }
        },
        methods: {
            listBadges() {
                this.badges.description = "Loading...";
                this.$root.loading = true;
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("load", () => {
                    console.log(xhr.response);
                    this.$root.loading = false;
                    this.badges = xhr.response;
                });
                xhr.open("GET", "/badges/list/");
                xhr.responseType = "json";
                xhr.send();
            },
            giveBadge(user, badge) {
                console.log(user);
                const formData = new FormData();
                formData.append('email', user);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    console.log(xhr.response);
                    document.getElementById("backBtn").click();
                };
                xhr.responseType = "json";
                xhr.open("POST", "/badges/add/" + badge.entityId);
                xhr.send(formData);
            }
        },
        beforeMount() {
            this.listBadges();
        },
        watch: {
            board: function () {
                this.listBadges();
            }
        },
    }
</script>
<style scoped>
    img {
        width: auto;
        height: 100px;
        cursor: pointer;
    }
</style>
