<template>
    <div>
        <div class="card">
            <div v-for="item in items" class="lost-item">
                <img v-bind:src="'/lostitems/images/' + item.img_name" alt="Image of the item" class="image">
                <div class="desc">
                    <h1>{{item.what}}</h1>
                    <p>{{item.location}}</p>
                </div>
            </div>
        </div>
        <div class="card">
            <h2 class="name">Lost and Found</h2>
            <form @submit="submitLostItem()" enctype="multipart/form-data">
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
                },
                items: []
            }
        },
        methods: {
            submitLostItem: function () {
                const formData = new FormData();
                formData.append("what", this.lnf.what);
                formData.append("location", this.lnf.location);
                formData.append("img", document.getElementById("lnf_img").files[0]);
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    console.log(xhr.response);
                };
                xhr.open('POST', '/lostitems/add');
                xhr.send(formData);
                this.fetchLostItemList();
            },
            fetchLostItemList() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.items = JSON.parse(xhr.response)
                };
                xhr.open('GET', '/lostitems/get');
                xhr.send();
            }
        },
        beforeMount() {
            this.fetchLostItemList();
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

    .lost-item {
        display: flex;
        padding: 10px;

    }
    .image {
        height: 300px;
        padding-right: 50px;
    }
</style>
