<template>
	<div>

		<p>City: {{flight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
		<p>Segment ID: {{flight.Segmentid}}</p>
		<!-- <router-link v-bind:to="{name: 'flight', params: {id: flight.id}}">Flight Detail</router-link> -->
		<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
	</div>
</template>


<script>
export default {
	name: "flight-summary",
	props:{
		flight: {type: Object, required: true}
	},
	methods: {
		getTicket: function(){
			var ticket = this.$store.getters.getTicket(this.flight.Segmentid)
			return ticket
		}
	}
};
</script>