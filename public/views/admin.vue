<template>
    <div>
        <div class="card">
            <h2>Add another admin</h2>
            <ul class="add-user-admin">
                <li v-for="user in users" class="user-list-item">
                    <span>{{user.email}}</span>
                    <button v-on:click="updateAdmin(user)" v-if="!user.is_admin" class="add-admin-btn action-admin-btn">Add</button>
                    <button v-on:click="updateAdmin(user)" v-else class="remove-admin-btn action-admin-btn">Remove</button>
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
            // TODO: Redirect if not admin
            fetchUsers() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.users = xhr.response
                };
                xhr.responseType = "json";
                xhr.open("GET", "/user/getAll");
                xhr.send();
            },
            checkAdmin() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    // TODO: Validate security: check if user can somehow change this variable
                    this.isAdmin = xhr.response.isAdmin;
                    if (!this.isAdmin) location.replace('/');
                };
                xhr.open("GET", "/user/status");
                xhr.responseType = "json";
                xhr.send();
            },
            updateAdmin(user) {
                // TODO: Only update if at least one other user is admin
                const formData = new FormData();
                formData.append('email', user.email);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    console.log(xhr.response);
                };
                xhr.responseType = "json";
                xhr.open("POST", "/user/updateAdmin");
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

</style>
