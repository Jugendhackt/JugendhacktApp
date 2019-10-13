<template>
    <div>
        <div class="card">
            <h1 class="name project-title">{{project.title}}</h1>
            <img :src="getImage()" alt="Project image" class="project-image">
            <p>
                {{project.description}}
            </p>
            <a :href="project.link.startsWith('http') ? project.link : 'http://' + project.link" target="_blank">View code</a>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                project: {}
            }
        },
        methods: {
            getProject() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    const res = xhr.response;
                    if (res.success === false) console.log(res.message);
                    else this.project = xhr.response;
                    if (!this.project.length) this.$router.replace(window.history.back());
                    this.$root.loading = false;
                    this.project = this.project[0];
                };
                xhr.responseType = 'json';
                xhr.open("GET", `/dashhack/project?name=${this.$route.params.event}&year=${this.$route.params.year}&title=${this.$route.params.project}`);
                xhr.send();
            },
            getImage() {
                return `/dashhack/images/${this.project.img_name}`;
            }
        },
        beforeMount() {
            this.getProject();
        },
    }
</script>

<style scoped>
    .project-image {
        display: block;
        max-height: 600px;
        max-width: 1600px;
        margin: 0 auto;
    }
    .project-title {
        text-decoration: #f86d14 underline;
        text-align: center;
    }
</style>
