<template>
    <div>
        <div class="card">
            <h1 class="name project-title">{{project.title}}</h1>
            <img :src="getImage()" alt="Project image" class="project-image">
            <p class="project-desc">
                {{project.description}}
            </p>
            <a :href="project.link.startsWith('http') ? project.link : 'http://' + project.link" target="_blank"
               class="project-link">View code</a>
        </div>
        <img class="back" alt="Back" src="/assets/icons/arrow-down.svg"
             @click="$router.push(`/alpacrash/${$route.params.event}`)">
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
                xhr.open("GET", `/alpacrash/project?name=${this.$route.params.event}&year=${this.$route.params.year}&title=${this.$route.params.project}`);
                xhr.send();
            },
            getImage() {
                return `/alpacrash/images/${this.project.img_name}`;
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

    .project-link {
        text-decoration: none;
        color: #f86d14;
    }

    .project-link:active {
        color: #f86d14;
    }

    .project-desc {
        background: #f8f8f8;
        border: 2px solid black;
        padding: 10px;
        width: 60%;
        display: block;
        margin: 20px auto;
    }
</style>
