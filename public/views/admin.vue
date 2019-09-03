<template>
    <div>
        <div class="card">
            <h2>Add another admin</h2>
            <ul class="add-user-admin">
                <li v-for="user in users"  v-on:click="addAdmin(user)" class="user-list-item">
                    {{user.email}}
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
            addAdmin(user) {
                const formData = new FormData();
                formData.append('email', user.email);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    console.log(xhr.response);
                };
                xhr.responseType = "json";
                xhr.open("POST", "/user/addAdmin");
                xhr.send(formData);
            }
        },
        beforeMount() {
            this.fetchUsers();
        }
    }
</script>

<style scoped>

</style>
