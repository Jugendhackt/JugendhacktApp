<template>
    <div>
        <div v-if="isAdmin" class="card">
            <h2 class="name">Add Packing list items</h2>
            <form @submit="updatePackingList()">
                <label for="packing_list_item">Item:</label>
                <input type="text" id="packing_list_item" v-model="pl.item" required>
                <button type="submit" class="button primary">Add item to list</button>
            </form>
        </div>
        <div class="card">
            <h2 class="name">Packing list</h2>
            <ul id="dpl_list">
                <li v-for="item in items" v-bind:key="item.id" class="packing-list-items">
                    <span>{{ item.item }}</span>
                    <button class="remove-pl-btn" v-if="isAdmin" v-on:click="removePl(item)">Delete</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                pl: {
                    item: ""
                },
                items: [],
                isAdmin: false
            }
        },
        methods: {
            updatePackingList() {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('item', this.pl.item);
                xhr.onload = () => {
                    this.handleResponse(xhr.response);
                    this.fetchPackingList();
                };
                xhr.open('PUT', '/packinglist/');
                xhr.responseType = 'json';
                xhr.send(formData);

            },
            fetchPackingList() {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'json';
                xhr.onload = () => this.items = xhr.response;
                xhr.open('GET', '/packinglist/');
                xhr.send();
            },
            removePl(item) {
                const formData = new FormData();
                formData.append("id", item.id);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.handleResponse(xhr.response);
                xhr.open("DELETE", "/packinglist/");
                xhr.send(formData);
                this.fetchPackingList();
            },
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => this.isAdmin = xhr.response.isAdmin;
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
            handleResponse(resp) {
                if (resp.success === false) alert(resp.message);
            }
        },
        beforeMount() {
            this.fetchPackingList();
            this.checkAdmin()
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

    .packing-list-items {
        position: relative;
    }

    .packing-list-items li {
        width: 100%;
        position: absolute;
        top: 1px;
        right: 5px;
    }
</style>
