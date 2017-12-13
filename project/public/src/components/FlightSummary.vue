<template>
	<div>
		<p>Title: {{flight.title}}</p> 
		<p>Description: {{flight.description}}</p>
		<p>Location: {{flight.location}}</p>
		<!-- <router-link v-bind:to="{name: 'flight', params: {id: flight.id}}">Flight Detail</router-link> -->
	</div>
</template>


<script>
export default {
	name: "flight-summary",
	props:{
		flight: Object
	}
};
</script>