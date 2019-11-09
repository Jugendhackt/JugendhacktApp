<template>
    <div>
        <div class="card" v-if="isAdmin">
            <h2 class="name">Add Lost and Found Items</h2>
            <div>
                <form @submit="submitLostItem()" enctype="multipart/form-data" id="lnf-form">
                    <label for="lnf_what">Item found:</label>
                    <input type="text" id="lnf_what" v-model="lnf.what" required>
                    <label for="lnf_location">Item found where:</label>
                    <input type="text" id="lnf_location" v-model="lnf.location" required>
                    <label for="lnf_img">Image of lost item</label>
                    <input type="file" id="lnf_img" accept="image/*" required>
                    <button type="submit" class="button primary">Add item to list</button>
                </form>
            </div>
        </div>
        <div class="card">
            <h2 class="name">Lost and Found Items</h2>
                <div v-for="item in items" :key="item.id" class="lost-item">
                    <v-image :src="'/lostitems/images/' + item.img_name" alt="Image of the item" class="image"></v-image>
                    <div class="desc">
                        <h1>{{item.what}}</h1>
                        <p>{{item.location}}</p>
                    </div>
                    <button class="remove-lnf-btn" v-if="isAdmin" v-on:click="removeLnF(item)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                lnf: {
                    what: "",
                    location: ""
                },
                items: [],
                isAdmin: false
            }
        },
        methods: {
            submitLostItem: function () {
                const formData = new FormData();
                formData.append("what", this.lnf.what);
                formData.append("location", this.lnf.location);
                formData.append("img", document.getElementById("lnf_img").files[0]);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.handleResponse(xhr.response);
                xhr.open('PUT', '/lostitems/');
                xhr.send(formData);
                this.lnf.what = '';
                this.lnf.location = '';
                this.fetchLostItemList();
            },
            fetchLostItemList() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.items = JSON.parse(xhr.response);
                xhr.open('GET', '/lostitems/');
                xhr.send();
            },
            removeLnF(item) {
                const formData = new FormData();
                formData.append("id", item.id);
                formData.append("img", item.img_name);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.handleResponse(xhr.response);
                xhr.open("DELETE", "/lostitems/");
                xhr.send(formData);
                this.fetchLostItemList();
            },
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.isAdmin = xhr.response.isAdmin;
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            }
        },
        beforeMount() {
            this.fetchLostItemList();
            this.checkAdmin();
        }
    }
</script>
<style scoped>

    .name {
        font-size: 1.4em;
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
        position: relative;
    }

    .image img {
        height: 100px;
        max-width: 100%;
        width: auto;
    }

    .remove-lnf-btn {
        position: absolute;
        right: 5px;
        top: 5px;
        width: auto;
        height: auto;
    }

    .desc {
        padding-left: 50px;
    }
</style>
