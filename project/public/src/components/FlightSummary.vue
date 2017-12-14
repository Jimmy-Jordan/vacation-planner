<template>
	<div>

		<p>City: {{flight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
		<p>Airline: {{flight.Segmentid}}</p>
		<p>Price: {{flight.Segmentid}}</p>
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