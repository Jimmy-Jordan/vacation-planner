<template>
	<el-card v-bind:style="[boxStyle, fontStyle]">
		<div v-if="this.flight.FlightSegment.length === 2" v-bind:style="fontStyle">
			<p>Layover to: {{flight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Final Destination: {{flight.FlightSegment[1].ArrivalAirport.LocationCode}}</p>
			
			<p>Airline: {{flight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
			<!-- <p>Airline 2: {{flight.FlightSegment[1].OperatedByAirline.CompanyText}}</p> -->

			<!-- <p>Segment ID: {{flight.Segmentid}}</p> -->

			<!-- <router-link v-bind:to="{name: 'flight', params: {id: flight.id}}">Flight Detail</router-link> -->
			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
		</div>
		
		<div v-else>
			<p>Destination: {{flight.FlightSegment[0].ArrivalAirport.LocationCode}}</p>
			<p>Airline: {{flight.FlightSegment[0].OperatedByAirline.CompanyText}}</p>
<!-- 			<p>Segment ID: {{flight.Segmentid}}</p>
 -->			
			<ticket-summary v-bind:ticket="getTicket()"></ticket-summary>
		</div>
		<el-button type="primary" plain>Continue</el-button>
	</el-card>	
	

  <!-- /*<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>*/ -->
</template>


<script>
export default {
	name: "outbound-flight-summary",
	props:{
		flight: {type: Object, required: true}
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
			var ticket = this.$store.getters.getTicket(this.flight.Segmentid)
			return ticket
		},
		
	},
};
</script>

