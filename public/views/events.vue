<template>
    <div>
        <div class="event card" v-for="event in events">
            <img class="cover" :src="event.img">
            <p>{{ event.date }}</p>
            <p>{{ event.location }}</p>
            <a class="button primary" target="_blank" v-if="event.anmelden !== 'expired'" :href="event.anmelden">Anmelden</a>
            <a :href="event.information" target="_blank" class="button secondary">Mehr Infos</a>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                events: [],
                loading: false
            }
        },
        methods: {
            fetch() {
                this.$root.loading = true;
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("load", () => {
                    this.events = xhr.response;
                    this.$root.loading = false;
                });
                xhr.open("GET", "/api/events");
                xhr.responseType = "json";
                xhr.send();
            }
        },
        beforeMount() {
            this.fetch();
        }
    }
</script>

<style scoped>
    .card.event .cover {
        width: 100%;
        margin: 0 auto;
    }

    .card.event {
        padding-top: 16px;
        padding-bottom: 16px;
    }

    @media only screen and (min-width: 900px) {
        .card.event {
            max-width: 50vw;
            margin: 5px auto 24px auto;
        }

        .card.event .cover {
            width: 100%;
        }
    }
</style>
