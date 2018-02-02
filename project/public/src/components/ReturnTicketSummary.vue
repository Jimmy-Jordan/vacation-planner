<template>
	<div>
		 <p>Estimated Price: ${{ticket.PTC_FareBreakdown.Adult.TotalAdultFare}}</p>
<!-- 		<p>Outbound Id: {{ticket.OutBoundOptionId[0]}}</p> -->	
	</div>
</template>


<script>
export default {
	name: "return-ticket-summary",
	props:{
		ticket: {type: Object, required: true}
	},
	//Perhaps a method that could be used in the v-if to determine if both outbound and return Segmentid match

};
</script>
