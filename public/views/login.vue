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
				<input maxlength=100 placeholder="Alpaka" type="text" id="register_username" v-model="register_data.username" required>
				<label for="register_email">Email:</label>
				<input type="email" placeholder="admin" id="register_email" v-model="register_data.email" required>

				<label for="register_password">Password:</label>
				<input type="password" placeholder="admin" id="register_password" v-model="register_data.password" required>

				<div class="form-inline">
					<label for="register_birthay">Birthday:</label>
					<input type="date" id="register_birthday" v-model="register_data.birthday" required>
				</div>
				<button type="submit" class="button primary">Register</button>
			</form>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			login_data: {
				email: "",
				password: ""
			},
			register_data: {
				username: "",
				email: "",
				password: "",
				birthday: ""
			}
		}
	},
	methods: {
		login(){
			return new Promise(function(resolve, reject) {
				let xhr = new XMLHttpRequest();
				xhr.addEventListener("load", () => {
					console.log(xhr.response);
				});
				var formdata = new FormData();
				formdata.set("email", $vm.login_data.email);
				formdata.set("password", $vm.login_data.assword);
				xhr.open("POST", "http://172.16.101.42/user/login");
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
				formdata.set("username", $vm.register_data.username);
				formdata.set("email", $vm.register_data.email);
				formdata.set("password", $vm.register_data.password);
				formdata.set("birthday", $vm.register_data.birthday);
				xhr.open("POST", "http://172.16.101.42/user/register");
				xhr.responseType = "json";
				xhr.send(formdata);
			});
		}
	}
}
</script>
<style>

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
</style>
