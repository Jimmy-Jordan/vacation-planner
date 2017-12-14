<template>
	<div>
		 <p>Price: {{ticket.PTC_FareBreakdown.Adult.TotalAdultFare}}</p>
		<p>Outbound Id: {{ticket.OutBoundOptionId[0]}}</p>
	</div>
</template>


<script>
export default {
	name: "ticket-summary",
	props:{
		ticket: {type: Object, required: true}
	},

};
</script>