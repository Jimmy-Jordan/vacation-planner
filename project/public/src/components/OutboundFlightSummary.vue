<template>
	
	<el-card v-bind:style="[boxStyle, fontStyle]">
		
		<div v-if="this.outboundFlight.FlightSegment.length === 2">
			
			<p>Layover to: {{outboundFlight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Final Destination: {{outboundFlight.FlightSegment[1].ArrivalAirport.LocationCode}}</p>
			<p>Airline: {{outboundFlight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>

			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>

		</div>
		
		<div v-else-if="this.outboundFlight.FlightSegment.length === 1">
			
			<p>Destination: {{outboundFlight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Airline: {{outboundFlight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
			
			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>

		</div>

		<router-link v-bind:to="{name: 'outboundFlight', params: {id: outboundFlight.Segmentid}}" tag="el-button">
		Continue
		</router-link>
		
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
				backgroundColor: '#f7c0b4',
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

