<template>
	<el-card v-bind:style="[boxStyle, fontStyle]">
		<div v-if="this.outboundFlight.FlightSegment.length === 2">
			<p>Layover to: {{outboundFlight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Final Destination: {{outboundFlight.FlightSegment[1].ArrivalAirport.LocationCode}}</p>
			
			<p>Airline: {{outboundFlight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
			<!-- <p>Airline 2: {{flight.FlightSegment[1].OperatedByAirline.CompanyText}}</p> -->

			<!-- <p>Segment ID: {{flight.Segmentid}}</p> -->

			<!-- <router-link v-bind:to="{name: 'flight', params: {id: flight.id}}">Flight Detail</router-link> -->
			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
		</div>
		
		<div v-else-if="this.outboundFlight.FlightSegment.length === 1">
			<p>Destination: {{outboundFlight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Airline: {{outboundFlight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
<!-- 			<p>Segment ID: {{flight.Segmentid}}</p>
 -->			
			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
		</div>
		<el-button type="primary" plain>Continue</el-button>
	</el-card>	
	
</template>


<script>
export default {
	name: "outbound-flight-summary",
	props:{
		outboundFlight: {type: Object, required: true}
	},
	data: function(){
		return {
			boxStyle: {
				width: '300px',
				backgroundColor: '#C8DFF3',
				border: '1px solid black',
			},
			fontStyle: {
				fontSize: '16px',
				padding: '10px 50px',
				textAlign: 'center',
			}

		}
		
	},
	methods: {
		getTicket: function(){
			var ticket = this.$store.getters.getOutboundContract(this.outboundFlight.Segmentid)
			return ticket
		},
		
	},
};
</script>

