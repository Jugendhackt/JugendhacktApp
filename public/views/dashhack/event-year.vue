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
        <span class="back">
            <img alt="Back" src="/assets/icons/arrow-down.svg" @click="$router.push('/dashhack')">
        </span>
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

</style>
