<template>
    <div>
        <div class="card">
            <h1>Jugend hackt {{capitalizeFirstLetter($route.params.event)}}</h1>
        </div>

        <div class="card creator-btn" v-if="user.isVerified">
            <img src="/assets/icons/plus.svg" alt="Add project" @click="openCreator()">
        </div>

        <div class="card event" v-for="ev in years" :key="ev.id" @click="openYear(ev)">
            <h2>Jugend hackt {{ev.name}} {{ev.year}}</h2>
            <img :src="getBadge(ev.name, ev.year)" alt="A great badge" class="badge-img">
        </div>

        <div class="alpacrash-nav-btn">
            <img class="prev" alt="Prev" src="/assets/icons/arrow-down.svg" :class="{ notAct : eventI === 0}"
                 @click="prevEvent()">
            <img class="back" alt="Back" src="/assets/icons/arrow-down.svg" @click="$router.push('/alpacrash')">
            <img class="next" alt="Next" src="/assets/icons/arrow-down.svg"
                 :class="{ notAct : eventI >= events.length - 1}" @click="nextEvent()">
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                user: {},
                years: [],
                events: [],
                eventI: -1
            }
        },

        methods: {
            getYears() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.years = xhr.response;
                    if (!this.years.length) this.$router.replace(window.history.back());  // Event doesn't exist
                    this.$root.loading = false;
                };
                xhr.responseType = "json";
                xhr.open("GET", `/alpacrash/${this.$route.params.event}/`);
                xhr.send();
            },
            getEvents() {
                this.$root.loading = true;
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.events = xhr.response;
                    this.eventI = this.events.indexOf(this.capitalizeFirstLetter(this.$route.params.event.toLowerCase()));
                    this.$root.loading = false;
                };
                xhr.open('GET', '/alpacrash/names');
                xhr.responseType = "json";
                xhr.send();
            },
            getBadge(name, year) {
                return `https://jhbadge.de/?evt=${name}&year=${year}`;
            },
            openYear(ev) {
                this.$router.push(`/alpacrash/${ev.name}/${ev.year}`);
            },
            capitalizeFirstLetter(s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            },
            prevEvent() {
                if (this.eventI - 1 >= 0) {
                    this.$router.push(`/alpacrash/${this.events[this.eventI - 1]}`);
                    this.$router.go();
                }
            },
            nextEvent() {
                if (this.eventI + 1 < this.events.length) {
                    this.$router.push(`/alpacrash/${this.events[this.eventI + 1]}`);
                    this.$router.go();
                }
            },
            openCreator() {
                const route = `/alpacrash/${this.$route.params.event}/creator`;
                this.$router.push(route);
            },
            getUserInfo() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.user = xhr.response;
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
        },

        beforeMount() {
            this.getYears();
            this.getEvents();
            this.getUserInfo();
        }
    }
</script>

<style scoped>
    .event {
        position: relative;
        cursor: pointer;
    }

    .badge-img {
        position: absolute;
        right: 10px;
        top: 10px;
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

    .creator-btn {
        display: flex;
        justify-content: space-around;
    }

    .creator-btn img {
        cursor: pointer;
        display: block;
        background: #00a5dc;
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }
</style>
