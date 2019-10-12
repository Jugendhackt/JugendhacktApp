<template>
    <div>
        <h1>TEST!!</h1>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                years: []
            }
        },

        methods: {
            getYears() {
                console.log("HELLO WORLD!", this.$route.params);
                this.years = [];
            }
        },

        beforeMount() {
            this.getYears();
        }
    }
</script>

<style scoped>

</style>
