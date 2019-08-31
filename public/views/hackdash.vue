<template>
  <div>
    <div class="board-navigation">
      <a class="board">JHHH2019</a>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function(){
    boards: [],
    loading: false
  },
  methods: function(){
    fetch(){
      this.loading = true;
      let xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        this.loading = false;
        boards = xhr.response;
      });
      xhr.open("GET", "/api/hackdash");
      xhr.responseType = "json";
      xhr.send();
    }
  }
}
</script>
<style scoped>
.board-navigation {
  position: fixed;
  height: 32px;
  bottom: 32px;
  left: 0;
  right: 0;
  overflow: scroll-y;
}
</style>
