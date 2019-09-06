<template>
    <div>
        <div class="card">
            <form @submit="update()">
                <label for="user_full_name">Full name:</label>
                <input maxlength=100 type="text" id="user_full_name" v-model="user.full_name" required>
                <label for="update_email">Email:</label>
                <input type="email" id="update_email" v-model="user.email" required>
                <label for="update_password">Password:</label>
                <input type="password" id="update_password" v-model="user.password">
                <div class="form-inline">
                    <label for="update_birthday">Birthday:</label>
                    <input type="date" id="update_birthday" v-model="user.birthday" required>
                </div>
                <button type="submit" class="button primary">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                user: {}
            }
        },
        methods: {
            fetchUser() {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    this.user = xhr.response[0];
                    this.user.birthday = (new Date(this.user.birthday)).dateToInput();
                    this.user.password = '';
                    // TODO: Redirect if not logged in
                };
                xhr.responseType = "json";
                xhr.open("GET", "/user/get");
                xhr.send();
            },
            update() {
                const data = JSON.stringify(this.user);
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.response.success) location.replace("/");
                };
                xhr.open('PUT', '/user/update');
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.responseType = "json";
                xhr.send(data);
            }

        },
        beforeMount() {
            this.fetchUser();
        }
    };
    Date.prototype.dateToInput = function(){
        return this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).substr(-2,2) + '-' + ('0' + this.getDate()).substr(-2,2);
    }
</script>

<style scoped>
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
