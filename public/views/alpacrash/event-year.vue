<template>
    <div>
        <div class="card">
            <h1 class="name">{{capitalizeFirstLetter($route.params.event)}} {{$route.params.year}}</h1>
        </div>
        <div class="card project" v-for="project of projects" @click="openProject(project)">
            <h2 class="name">{{project.title}}</h2>
        </div>
        <div class="alpacrash-nav-btn">
            <img class="prev" alt="Prev" src="/assets/icons/arrow-down.svg" :class="{ notAct : yearI === 0}"
                 @click="prevEvent()">
            <img class="back" alt="Back" src="/assets/icons/arrow-down.svg"
                 @click="$router.push(`/alpacrash/${$route.params.event}`)">
            <img class="next" alt="Next" src="/assets/icons/arrow-down.svg"
                 :class="{ notAct : yearI >= years.length - 1}" @click="nextEvent()">
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                projects: [],
                years: [],
                yearI: -1
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
                xhr.open('GET', `/alpacrash/${this.$route.params.event}/${this.$route.params.year}`);
                xhr.send();
            },
            getYears() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.years = xhr.response;
                    this.yearI = this.years.indexOf(parseInt(this.$route.params.year));
                    this.$root.loading = false;
                };
                xhr.responseType = "json";
                xhr.open("GET", `/alpacrash/names/${this.$route.params.event}`);
                xhr.send();
            },
            openProject(p) {
                this.$router.push(`/alpacrash/${this.$route.params.event}/${this.$route.params.year}/${p.title}`);
            },
            capitalizeFirstLetter(s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            },
            prevEvent() {
                if (this.yearI - 1 >= 0) {
                    this.$router.push(`/alpacrash/${this.$route.params.event}/${this.years[this.yearI - 1]}`);
                    this.$router.go();
                }
            },
            nextEvent() {
                if (this.yearI + 1 < this.years.length) {
                    this.$router.push(`/alpacrash/${this.$route.params.event}/${this.years[this.yearI + 1]}`);
                    this.$router.go();
                }
            }
        },

        beforeMount() {
            this.getProjects();
            this.getYears();
        }
    }
</script>

<style scoped>
    .project {
        cursor: pointer;
    }

    /* Back button */
    .alpacrash-nav-btn {
        position: fixed;
        bottom: 10px;
        z-index: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .alpacrash-nav-btn img {
        cursor: pointer;
        display: block;
        background: #00a5dc;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 5px;
    }

    .prev {
        transform: rotate(90deg);
    }

    .next {
        transform: rotate(270deg);
    }

    .notAct {
        background: #444 !important;
        cursor: default !important;
    }
</style>
