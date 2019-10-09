<template>
    <div>
        <div class="card">
            <h1 class="name">{{$route.params.event}} {{$route.params.year}}</h1>
        </div>
        <div class="card" v-for="project of projects">
            {{project}}
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
                    this.projects = xhr.response;
                    console.log(this.projects, xhr.response);
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
