<template>
    <nav class="navigation">
        <div class="branding">
            Jugendhackt App <small style="cursor: pointer; font-size: 8px" v-on:click="clearCache()">clear cache</small>
        </div>
        <div class="nav">
            <router-link to="/"><img class="icon" src="assets/icons/calendar.svg" alt="Events"></router-link>
            <router-link to="/hackdash"><img class="icon" src="assets/icons/clipboard.svg" alt="Hackdash"></router-link>
            <router-link to="/feed"><img alt="Feed" class="icon" src=""></router-link>
            <router-link to="/packingList"><img class="icon" src="assets/icons/list.svg" alt="Packing List"></router-link>
            <router-link to="/lostitems"><img class="icon" src="assets/icons/briefcase.svg" alt="Lost and Found"></router-link>
            <router-link to="/login"><img class="icon" src="assets/icons/key.svg" alt="Login"></router-link>
        </div>
    </nav>
</template>

<script>
    module.exports = {
        methods: {
            clearCache: function () {
                console.log("Cleared caches!");
                caches.delete("Jugendhackt");
                location.reload(true);
            }
        }
    }
</script>
