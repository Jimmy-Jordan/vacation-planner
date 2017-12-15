<template>
	<div>
		<!-- <p>{{flight}}</p> -->
		<p>City: {{flight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
		<p>Airline: {{flight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
		<p>Price: {{flight.FlightSegment[0].ArrivalAirport}}</p>
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