<template>
  <div>
    <div v-for="event in events" class="card">
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
  data: function(){
    return {
      events: []
    }
  },
  methods: {
    fetch(){
      let xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        console.log(xhr.response);
        this.events = xhr.response;
      });
      xhr.open("GET", "/api/events");
      xhr.responseType = "json";
      xhr.send();
    }
  },
  beforeMount(){
    this.fetch();
  }
}
</script>
<style scoped>
.cover {
max-width: 1024px;
max-height: 614px;
width: 100%;
}

.card {
padding-bottom: 16px;
}
</style>
