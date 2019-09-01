<template>
	<div>
		<div class="card">
			<ul id="dpl_list">
				<li v-for="item in items">
					{{ item.item }}
				</li>
			</ul>
		</div>
		<div class="card">
			<h2 class="name">Packing list</h2>
			<form @submit="updatePackingList()">
				<label for="packing_list_item">Item:</label>
				<input type="text" id="packing_list_item" v-model="pl.item" required>
				<button type="submit" class="button primary">Add item to list</button>
			</form>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			pl: {
				item: ""
			},
			items: []
		}
	},
	methods: {
		updatePackingList: function() {
			const data = JSON.stringify(this.pl);
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				console.log(xhr.response);
			}
			xhr.open('POST', '/packinglist/add');
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr.send(data);
			document.querySelector('#packing_list_item').value = '';
			this.fetchPackingList();
        	},
		fetchPackingList() {
			const xhr = new XMLHttpRequest();
			xhr.onload = () => {
				this.items =  JSON.parse(xhr.response)
			}
			xhr.open('GET', '/packinglist/get')
			xhr.send();
		}
	},
	beforeMount() {
		this.fetchPackingList();
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
