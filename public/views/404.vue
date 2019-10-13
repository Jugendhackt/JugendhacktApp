<template>
    <div class="card">
        <h2 class="name">404 Error</h2>
        <i> Page not found!</i> <br>
        <strong @click="goBack()" class="back-link">Go back to last page</strong>
    </div>
</template>

<script>
    module.exports = {
        methods: {
            goBack() {
                this.$router.replace(window.history.back())
            }
        },
    }
</script>

<style>
    .back-link {
        cursor: pointer;
    }
</style>
