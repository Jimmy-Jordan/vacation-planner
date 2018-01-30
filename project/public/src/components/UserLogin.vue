<template>
	<div>
		<h4>Login Page </h4> 
		<p>username: {{user.username}}</p>
		<input class="input" type="username" name="username">

		<label class="label">Password</label>

		<input class="input" type="password" name="password">
		<router-link v-bind:to="{name: 'user', params: {id: user.id}}">Login Page</router-link>
	</div>
</template>




<script>
  export default {
  	name: "user-login-page",
	data() {
	  return {
		user: {
		  email: email,
		  password: password
		}
	  };
	}
  };
</script>