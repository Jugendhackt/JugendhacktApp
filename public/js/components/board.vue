<template>
    <div>
        <div class="card">
            <h3>{{ board.title }}</h3>
            <p>{{ boardData.description }}</p>
        </div>
        <div class="card" v-for="project in boardData.projects">
            <h4>{{ project.title }}</h4>
            <v-image :src="project.cover.startsWith('http') ? project.cover : 'https://hackdash.s3-us-west-2.amazonaws.com' + project.cover"
                 v-if="project.cover"></v-image>
            <p>{{ project.description }}</p>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["board"],
        data: function () {
            return {
                boardData: {},
            }
        },
        methods: {
            fetch() {
                this.boardData.description = "Loading...";
                this.$root.loading = true;
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("load", () => {
                    console.log(xhr.response);
                    this.$root.loading = false;
                    this.boardData = xhr.response;
                });
                xhr.open("GET", "/api/hackdash/board/" + this.board.domain);
                xhr.responseType = "json";
                xhr.send();
            }
        },
        beforeMount() {
            this.fetch();
        },
        watch: {
            board: function () {
                this.boardData.description = "Loading...";
                this.fetch();
            }
        },
    }
</script>
<style scoped>
    img {
        width: auto;
        height: 100px;
    }
</style>
