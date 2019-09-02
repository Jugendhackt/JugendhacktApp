<template>
    <div class="focuser">
        <Board class="board-view" v-if="this.boardOpen" :board="this.boards[this.current_board]"></Board>
        <div :class="{ hide: boardOpen}" class="board-navigation">
            <div v-for="(board, i) in boards" @click="setActive(i)" class="board card" :title="board.title" :key="board._id">
                {{board.title || board.domain}}
                <img class="cover" v-if="board.covers[0]"
                     :src="board.covers[0].startsWith('http') ? board.covers[0] : 'https://hackdash.s3-us-west-2.amazonaws.com' + board.covers[0]">
            </div>
        </div>
        <span class="back" :class="{ hide : !boardOpen}"><img @click="current_board = undefined" src="/assets/icons/arrow-down.svg" alt="Back"></span>
    </div>
</template>

<script>
    const Board = httpVueLoader("/js/components/board.vue");
    module.exports = {
        data: function () {
            return {
                boards: {},
                current_board: undefined,
                loading: false
            }
        },
        methods: {
            fetch() {
                this.loading = true;
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("load", () => {
                    console.log(xhr.response);
                    this.loading = false;
                    this.boards = xhr.response;
                    this.boards.reverse();
                });
                xhr.open("GET", "/api/hackdash");
                xhr.responseType = "json";
                xhr.send();
            },
            setActive(id) {
                this.current_board = id;
            }
        },
        computed: {
            boardOpen() {
                return this.current_board !== undefined;
            }
        },
        beforeMount() {
            this.fetch();
            this.current_board = undefined;
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
        transition: height 500ms linear;
        z-index: -2;
    }

    .board-navigation.hide {
        height: 0 !important;
        overflow: hidden;
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

    .board .cover {
        height: 88px;
        margin-left: auto;
        border-radius: 5px;
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

    .back.hide img {
        transform: rotateZ(-90deg);
    }

    .back.hide {
        bottom: -80px;
    }

    .card {
        margin-top: 4px;
        margin-bottom: 4px;
        box-shadow: 0 0 6px #cecece;
    }

    .card:last-child {
        margin-bottom: 50px;
    }
</style>
