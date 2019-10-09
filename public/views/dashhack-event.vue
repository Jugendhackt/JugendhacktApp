<template>
    <div>
        <div class="card">
            <h1 class="name">{{$route.params.event}} {{$route.params.year}}</h1>
        </div>
        <div class="card" v-for="project of projects">
            <h2 class="name">{{project.title}}</h2>
            <p>
                {{project.description}}
            </p>
            <p>
                <a :href="project.link.startsWith('http') ? project.link : 'http://' + project.link" target="_blank">View code</a>
            </p>
        </div>
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
                    this.$root.loading = false;
                };
                xhr.open('GET', `/dashhack/projects?name=${this.$route.params.event}&year=${this.$route.params.year}`);
                xhr.responseType = "json";
                xhr.send();
            }
        },

        beforeMount() {
            this.getProjects();
        }
    }
</script>

<style scoped>

</style>
