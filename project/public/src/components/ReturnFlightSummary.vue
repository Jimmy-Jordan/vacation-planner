<template>
	<el-card v-bind:style="[boxStyle, fontStyle]">
		<div v-if="this.returnFlight.FlightSegment.length === 2" v-bind:style="fontStyle">
			<p>Layover to: {{returnFlight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Final Destination: {{returnFlight.FlightSegment[1].ArrivalAirport.LocationCode}}</p>
			
			<p>Airline: {{returnFlight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
			<!-- <p>Airline 2: {{flight.FlightSegment[1].OperatedByAirline.CompanyText}}</p> -->

			<!-- <p>Segment ID: {{flight.Segmentid}}</p> -->

			<!-- <router-link v-bind:to="{name: 'flight', params: {id: flight.id}}">Flight Detail</router-link> -->
			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
		</div>
		
		<div v-else>
			<p>Destination: {{returnFlight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Airline: {{returnFlight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
<!-- 			<p>Segment ID: {{flight.Segmentid}}</p>
 -->			
			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
		</div>
		<el-button type="primary" plain>Continue</el-button>
	</el-card>
</template>


<script>
export default {
	name: "return-flight-summary",
	props:{
		returnFlight: {type: Object, required: true},
		outboundFlight: {type: Object, required: true}
	},
	data: function(){
		return {
			boxStyle: {
				width: '300px',
				// backgroundColor: '#39F7A5',
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
			var ticket = this.$store.getters.getOutboundContract(this.returnFlight.Segmentid)
			return ticket
		},
		//When you have a round trip, there are multiple contracts that correspond to a single Segmentid, individual contracts require both outbound and return SegmentId to match the contract.
		
	}
};
</script>

