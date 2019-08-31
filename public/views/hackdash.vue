<template>
  <div>
    <!--<board v-if="$route.params.hasOwnAttribute('board')" :board="$route.params.board"></board>-->
    <div class="board-navigation">
      <router-link v-for="board in boards" :to="'hackdash/' + board.domain" class="board">{{board.domain}}</router-link>
    </div>
  </div>
</template>

<script>

module.exports = {
  data: function(){
    return {
      boards: {},
      loading: false
    }
  },
  methods: {
    fetch(){
      this.loading = true;
      let xhr = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        console.log(xhr.response);
        this.loading = false;
        this.boards = xhr.response;
      });
      xhr.open("GET", "/api/hackdash");
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
.board-navigation {
  border: solid 1px #cecece;
  position: fixed;
  display: flex;
  font-size: .75em;
  height: 64px;
  bottom: 66px;
  left: 0;
  right: 0;
  overflow: scroll;
  background: #fff;
  z-index: -1;
}

.board {
  display: flex;
  border-right: solid 1px #cecece;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  min-width: 64px;
  background: #fff;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  font-family: sans-serif;
  overflow: hidden;
}
</style>
