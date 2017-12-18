<template>
	<div v-if="this.flight.FlightSegment.length === 2">
		<p>Layover to: {{flight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
		<p>Final Destination: {{flight.FlightSegment[1].ArrivalAirport.LocationCode}}</p>
		
		<p>Airline 1: {{flight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
		<!-- <p>Airline 2: {{flight.FlightSegment[1].OperatedByAirline.CompanyText}}</p> -->

		<p>Segment ID: {{flight.Segmentid}}</p>

		<!-- <router-link v-bind:to="{name: 'flight', params: {id: flight.id}}">Flight Detail</router-link> -->
		<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
	</div>
	<div v-else>
		<p>Destination: {{flight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
		<p>Airline: {{flight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
		<p>Segment ID: {{flight.Segmentid}}</p>
		
		<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
	</div>
</template>


<script>
export default {
	name: "return-flight-summary",
	props:{
		flight: {type: Object, required: true}
	},
	methods: {
		getTicket: function(){
			var ticket = this.$store.getters.getTicket(this.flight.Segmentid)
			return ticket
		},
		
	}
};
</script>

