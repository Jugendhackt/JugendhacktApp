<template>
    <div>
        <div class="event card" v-for="event in events" :key="event.id">
            <img class="cover" :src="event.img">
            <p>{{ event.date }}</p>
            <p>{{ event.location }}</p>
            <a class="button primary" target="_blank" v-if="event.anmelden !== 'expired'" :href="event.anmelden">Anmelden</a>
            <a class="button secondary disabled" target="_blank" v-else>Anmelden</a>
            <a :href="event.information" target="_blank" class="button secondary">Mehr Infos</a>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                events: [],
            }
        },
        methods: {
            fetch() {
                this.$root.loading = true;
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("load", () => {
                    this.$root.loading = false;
                    this.events = xhr.response;
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

    .button.disabled {
        cursor: default;
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
