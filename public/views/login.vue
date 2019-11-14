<template>
    <div>
        <div class="card">
            <h2 class="name">Login</h2>
            <form @submit="login()">
                <label for="login_email">Email:</label>
                <input type="email" id="login_email" v-model="login_data.email" required>
                <label for="login_password">Password:</label>
                <input type="password" id="login_password" v-model="login_data.password" required>
                <button type="submit" class="button primary">Login</button>
            </form>
        </div>
        <div class="card">
            <h2 class="name">Register</h2>
            <form @submit="register()">
                <label for="register_username">Username:</label>
                <input maxlength=100 placeholder="Alpaka" type="text" id="register_username" v-model="register_data.fullName" required>
                <label for="register_email">Email:</label>
                <input type="email" placeholder="admin" id="register_email" v-model="register_data.email" required>

                <label for="register_password">Password:</label>
                <input type="password" placeholder="admin" id="register_password" v-model="register_data.password" required>

                <div class="form-inline">
                    <label for="register_birthday">Birthday:</label>
                    <input type="date" id="register_birthday" v-model="register_data.birthday" required>
                </div>
                <button type="submit" class="button primary">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                login_data: {
                    email: "",
                    password: ""
                },
                register_data: {
                    fullName: "",
                    email: "",
                    password: "",
                    birthday: ""
                }
            }
        },
        methods: {
            login() {
                const formData = new FormData();
                formData.append('email', this.login_data.email);
                formData.append('password', this.login_data.password);
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (xhr.response.success) this.$router.replace("/user");
                };
                xhr.open('POST', '/user/login');
                xhr.responseType = "json";
                xhr.send(formData);
            },
            register() {
                const data = JSON.stringify(this.register_data);
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('email', this.register_data.email);
                formData.append('birthday', this.register_data.birthday);
                formData.append('fullName', this.register_data.fullName);
                formData.append('password', this.register_data.password);
                xhr.onload = () => {
                    if (xhr.response.success) this.$router.replace("/user");
                };
                xhr.open('POST', '/user/register');
                xhr.responseType = "json";
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

    .button {
        display: inline-block;
    }
</style>
