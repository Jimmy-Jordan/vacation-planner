<template>
	<div v-if="this.ticket.InBoundOptionId.length === 1">
		 <p>Estimated Roundtrip: ${{ticket.PTC_FareBreakdown.Adult.TotalAdultFare}}</p>
<!-- 		<p>Outbound Id: {{ticket.OutBoundOptionId[0]}}</p> -->	
	</div>
	<div v-else>
		 <p>Estimated Price: ${{ticket.PTC_FareBreakdown.Adult.TotalAdultFare}}</p>
<!-- 		<p>Outbound Id: {{ticket.OutBoundOptionId[0]}}</p> -->	
	</div>
</template>


<script>
export default {
	name: "ticket-summary",
	props:{
		ticket: {type: Object, required: true}
	},
	//Perhaps a method that could be used in the v-if to determine if both outbound and return Segmentid match

};
</script>
