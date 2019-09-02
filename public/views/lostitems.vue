<template>
    <div>
        <div class="card">
            <h2 class="name">Lost and Found</h2>
            <form @submit="lostNFound()" enctype="multipart/form-data">
                <label for="lnf_what">Item found:</label>
                <input type="text" id="lnf_what" v-model="lnf.what" required>
                <label for="lnf_location">Item found where:</label>
                <input type="text" id="lnf_location" v-model="lnf.location" required>
                <label for="lnf_img">Image of lost item</label>
                <input type="file" id="lnf_img" v-model=lnf.img required>
                <button type="submit" class="button primary">Add item to list</button>
            </form>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                lnf: {
                    what: "",
                    location: "",
                    img: ""
                }
            }
        },
        methods: {
            lostNFound: function () {
                const data = JSON.stringify(this.lnf);
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    console.log(xhr.response);
                };
                xhr.open('POST', '/lostitems/add');
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(data);
            }
        }
    }
</script>
<style scoped>

    .name {
        font-size: 1.4em;
    }

    .card {
        display: block;
        width: auto;
    }

    input {
        background: #fff;
        border: 3px solid #000;
        display: block;
        padding: 0.3em;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 25px;
        margin-top: 5px;
    }

    .button {
        display: inline-block;
    }
</style>
