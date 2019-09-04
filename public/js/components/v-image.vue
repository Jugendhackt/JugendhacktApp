<template>
    <span>
    <img :src="src" :alt="alt" @click="isBig = true">
    <div class="big" :class="{ isHidden : !isBig}" @click="isBig = false">
        <img :src="src">
        <div class="details" v-if="description">
            {{description}}
        </div>
    </div>
    </span>
</template>

<script>
module.exports = {
    props: ["src", "alt", "description"],
    data: function(){
        return {
            isBig: false
        }
    }
}
</script>
<style scoped>
.big {
    position: fixed;
    left: 0;
    right: 0;
    top: 53px;
    bottom: 66px;
    background: rgba(0,0,0,.8);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 200ms linear;
    opacity: 1;
    pointer-events: auto;
}

.big .details {
    background: rgba(0,0,0, .5);
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    z-index: 5;
}

.big.isHidden {
    opacity: 0;
    pointer-events: none;
}

.big img {
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    z-index: 4;
}
</style>
