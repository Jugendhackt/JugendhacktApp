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
            login: function () {
                const data = JSON.stringify(this.login_data);
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    console.log(xhr.response);
                };
                xhr.open('POST', '/user/login');
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(data);
            },
            register: function () {
                const data = JSON.stringify(this.register_data);
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    console.log(xhr.response);
                };
                xhr.open('POST', '/user/register');
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(data);
            }
            /*
            login(){
                return new Promise(function(resolve, reject) {
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", () => {
                        console.log(xhr.response);
                    });
                    var formdata = new FormData();
                    formdata.set("email", this.vm.login_data.email);
                    formdata.set("password", this.vm.login_data.assword);
                    xhr.open("POST", "/user/login");
                    xhr.responseType = "json";
                    xhr.send(formdata);
                });
            },

            register(){
                return new Promise(function(resolve, reject) {
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", () => {
                        console.log(xhr.response);
                    });
                    var formdata = new FormData();
                    formdata.set("username", vm.register_data.username);
                    formdata.set("email", vm.register_data.email);
                    formdata.set("password", vm.register_data.password);
                    formdata.set("birthday", vm.register_data.birthday);
                    xhr.open("POST", "/user/register");
                    xhr.responseType = "json";
                    xhr.send(formdata);
                });
            }*/
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
