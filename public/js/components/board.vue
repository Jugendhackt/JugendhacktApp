<template>
  <div class="card">
    <h3>{{ board.title }}</h3>
    <p>{{ boardData.description }}</p>
  </div>
</template>

<script>
module.exports = {
  props: ['board'],
  data: function(){
    return {
      boardData: {},
    }
  },
  methods: {
    fetch(){
      this.loading = true;
      let xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        console.log(xhr.response);
        this.loading = false;
        this.boardData = xhr.response;
      });
      xhr.open("GET", "/api/hackdash/board/" + this.board.domain);
      xhr.responseType = "json";
      xhr.send();
    }
  },
  beforeMount() {
    this.fetch();
  },
  watch: {
    board: function() {
      this.boardData.description = "Loading...";
      this.fetch();
    }
  },
}
</script>
