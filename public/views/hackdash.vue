<template>
  <div>
    <Board class="board-view" v-if="this.current_board !== undefined" :board="this.boards[this.current_board]"></Board>
    <div class="board-navigation">
      <span v-for="(board, i) in boards" @click="setActive(i)" class="board card" :title="board.title" :key="board._id">{{board.title || board.domain}}</span>
    </div>
  </div>
</template>

<script>
const Board = httpVueLoader("/js/components/board.vue");
module.exports = {
  data: function(){
    return {
      boards: {},
      current_board: undefined,
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
    },
    setActive(id){
      this.current_board = id;
    }
  },
  computed: {
    sorted_boards(){
      return this.boards.sort(function(a, b){
        return new Date(b.created_at) - new Date(a.created_at);
      });
    }
  },
  beforeMount(){
    this.fetch();
  },
  components: {
    Board
  }
}
</script>
<style scoped>
.board-navigation {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.board {
  cursor: pointer;
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

.board-navigation.hide {
  height: 0;
  overflow: hidden;
}

.card {
  margin-top: 4px;
  margin-bottom: 4px;
  box-shadow: 0 0 6px #cecece;
}
</style>
