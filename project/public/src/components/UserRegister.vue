<template>
	<div>
		<h4>Register New User</h4> 
		<p>username: {{user.username}}</p>
		<p>password: {{user.location}}</p>
		<router-link v-bind:to="{name: 'user', params: {id: user.id}}">Login Page</router-link>
	</div>
</template>




<script>
	
export default {
	name: 'user-register-page',
	data: function(){
		return {
			username:'',
			password:'',

		};
	},
	methods:{
		onSubmit: function(user, username, password){
			this.$store.dispatch("userregister", {
				data: {
					username: username,
					password: password,

				}
			});
			this.$set(this, "username", "");
			this.$set(this, "password", "");
			
			
		}
	}
}
</script>