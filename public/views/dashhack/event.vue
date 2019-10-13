<template>
    <div>
        <div class="card">
            <h1>Jugend hackt {{capitalizeFirstLetter($route.params.event)}}</h1>
        </div>
        <div class="card event" v-for="ev in years" @click="openYear(ev)">
            <h2>Jugend hackt {{ev.name}} {{ev.year}}</h2>
            <img :src="getBadge(ev.name, ev.year)" alt="A great badge" class="badge-img">
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
                years: []
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
                xhr.open("GET", `/dashhack/?event=${this.$route.params.event}`);
                xhr.send();
            },
            getBadge(name, year) {
                return `https://jhbadge.de/?evt=${name}&year=${year}`;
            },
            openYear(ev) {
                this.$router.push(`/dashhack/${ev.name}/${ev.year}`);
            },
            capitalizeFirstLetter(s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            }
        },

        beforeMount() {
            this.getYears();
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
</style>
