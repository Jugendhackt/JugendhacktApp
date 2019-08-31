<template>
  <div>
    <router-view></router-view>
    <div class="board-navigation">
      <router-link to="jhhh2019" class="board">JHHH2019</router-link>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function(){
    return {
      boards: [],
      loading: false
    }
  },
  methods: {
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
  font-size: .5em;
  height: 64px;
  bottom: 66px;
  left: 0;
  right: 0;
  overflow: scroll-y;
  background: #fff;
  z-index: -1;
}

.board {
  display: flex;
  border: solid 1px #cecece;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  background: #fff;
}
</style>
