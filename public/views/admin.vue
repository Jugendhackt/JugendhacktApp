<template>
    <div>
        <div class="card">
            <h2>Add another admin</h2>
            <ul class="add-user-admin">
                <li v-for="user in users" class="user-list-item">
                    <span>{{user.email}}</span>
                    <button v-on:click="updateAdmin(user)" v-if="!user.is_admin" class="add-admin-btn action-admin-btn button button-primary">Add</button>
                    <button v-on:click="updateAdmin(user)" v-else class="remove-admin-btn action-admin-btn button button-secondary">Remove</button>
                    <button v-on:click="verifyUser(user)" v-if="!user.is_verified" class="verifiy-admin-btn action-admin-btn button button-tertiary">Verify</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                users: [],
                isAdmin: false
            }
        },
        methods: {
            fetchUsers() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (xhr.response.success === true) {
                        this.users = xhr.response.data
                    } else console.log(xhr.response.message);
                };
                xhr.responseType = "json";
                xhr.open("GET", "/user/getAll");
                xhr.send();
            },
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.isAdmin = xhr.response.isAdmin;
                    if (!this.isAdmin) this.$router.replace('/');
                };
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
            updateAdmin(user) {
                const formData = new FormData();
                formData.append('email', user.email);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => console.log(xhr.response);
                xhr.responseType = "json";
                xhr.open("PUT", "/user/updateAdmin");
                xhr.send(formData);
                this.fetchUsers();
            },
            verifyUser(user) {
                const formData = new FormData();
                formData.append('email', user.email);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => console.log(xhr.response);
                xhr.responseType = "json";
                xhr.open("PUT", "/user/verify");
                xhr.send(formData);
                this.fetchUsers();
            }
        },
        beforeMount() {
            this.checkAdmin();
            this.fetchUsers();
        }
    }
</script>

<style scoped>
    .button {
        display: inline-block;
    }
</style>
