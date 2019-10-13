<template>
    <div>
        <div class="card">
            <h1 class="name">{{capitalizeFirstLetter($route.params.event)}} {{$route.params.year}}</h1>
        </div>
        <div class="card project" v-for="project of projects" @click="openProject(project)">
            <h2 class="name">{{project.title}}</h2>
        </div>
        <img class="back" alt="Back" src="/assets/icons/arrow-down.svg"
             @click="$router.push(`/dashhack/${$route.params.event}`)">
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                projects: []
            }
        },

        methods: {
            getProjects() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    const res = xhr.response;
                    if (res.success === false) console.log(res.message);
                    else this.projects = xhr.response;
                    if (!this.projects.length) this.$router.replace(window.history.back());
                    this.$root.loading = false;
                };
                xhr.responseType = "json";
                xhr.open('GET', `/dashhack/projects?name=${this.$route.params.event}&year=${this.$route.params.year}`);
                xhr.send();
            },
            openProject(p) {
                this.$router.push(`/dashhack/${this.$route.params.event}/${this.$route.params.year}/${p.title}`);
            },
            capitalizeFirstLetter(s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            }
        },

        beforeMount() {
            this.getProjects();
        }
    }
</script>

<style scoped>
    .project {
        cursor: pointer;
    }
</style>
