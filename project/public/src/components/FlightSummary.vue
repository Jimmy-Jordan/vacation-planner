<template>
	<div>
		<p>City: {{flight.LocationCode}}</p> 
		<p>Airline: {{flight.description}}</p>
		<p>Price: {{flight.location}}</p>
		<router-link v-bind:to="{name: 'flight', params: {id: flight.id}}">Flight Detail</router-link>
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