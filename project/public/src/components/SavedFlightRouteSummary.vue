<template>
	
	<el-card v-bind:style="[boxStyle, fontStyle]">
		
		<div>
			<p>Origin: {{savedRoute.origin}}</p>
			<p>Destination: {{savedRoute.destination}}</p>
			<p>Trip Type: {{savedRoute.type_of_trip}}</p>
			<p>Passengers: {{savedRoute.quantity}}</p>

		</div>
		
	</el-card>	
	
</template>


<script>
export default {
	name: "saved-flight-route-summary",
	props:{
		savedRoute: {type: Object, required: true}
	},
	data: function(){
		return {
			boxStyle: {
				width: '800px',
				backgroundColor: '#e4e3e8',
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

