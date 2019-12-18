<template>
    <div>
        <div class="loading" :class="{ hide: !this.$root.loading}"><img src="/assets/icons/badges/SuperAlpaka.png" alt="..." width="64" height=74></div>
        <Navigation></Navigation>
        <router-view id="component_view"></router-view>
    </div>
</template>

<script>
import Navigation from "/js/components/navigation.vue";

export default {
    components: {Navigation}
}
</script>