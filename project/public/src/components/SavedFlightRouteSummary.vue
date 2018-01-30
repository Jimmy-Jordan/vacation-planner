<template>
	
	<el-card v-bind:style="[boxStyle, fontStyle]">
		
		<div>
			
			<p>Trip Type: {{flightRoute.trip_type}}</p>
			<p>Origin: {{flightRoute.origin}}</p>
			<p>Destination: {{flightRoute.destination}}</p>
			<p>Passengers: {{flightRoute.passengers}}</p>

		</div>
		
	</el-card>	
	
</template>


<script>
export default {
	name: "saved-flight-route-summary",
	props:{
		flightRoute: {type: Object, required: true}
	},
	data: function(){
		return {
			boxStyle: {
				width: '500px',
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
};
</script>

