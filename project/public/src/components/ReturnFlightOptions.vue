<template>	
	<el-row>
		<el-col :offset="0" :span="12">
			<div>
				<div 
					is="outbound-flight-summary"
					v-for="outboundFlight in getDeparture"
					v-bind:outboundFlight="outboundFlight">
					<p>{{outboundFlight.Segmentid}}</p>
				</div>	
				<ul>
					<li 
						is="return-flight-summary" 
						v-for="returnFlight in returnFlights" 
						v-bind:returnFlight="returnFlight">
					</li>
				</ul>
				<el-pagination
					v-model="current"
					:page-count="totalPages"
					:page-size="perPage"
					layout="prev, pager, next"
					v-on:current-change="currentChange"
				>
				</el-pagination>
			</div>	
		</el-col>
	</el-row>		
</template>


<script>
export default {
	name: "return-flight-options",
	data: function(){
		return {
			current: parseInt(this.$route.query.page) || 1,
			perPage: 10
		}
	},
	props: {
		outboundFlight: {type: Object, required: true}
	},
	computed: {
		totalPages: function(){
			return Math.ceil(this.$store.getters.getReturnFlights.length  / this.perPage);
		},
		returnFlights: function(){
			var flights, chunkStart, chunkEnd;
			flights = this.$store.getters.getReturnFlights;
			chunkStart = (this.current - 1) * this.perPage;
			chunkEnd = chunkStart + this.perPage;
			return flights.slice(chunkStart, chunkEnd);
		}
	},
	// created () {
	// 	this.getDeparture()
	// },
	methods: {
		"currentChange": function(newPage){
			this.$set(this, "current", newPage);
		},
		// getDeparture: function(){
		// 	console.log(this.$route.params.id)
		// 	this.$store.getters.getOutboundFlight(this.$route.params.id)
		// }
	},
	watch: {
		"$route": function(newRoute, oldRoute){
			this.$set(this, "current", parseInt(newRoute.query.page));
		},
		"current": function(newPage, oldPage){
			this.$router.push({"path": location.path, "query": {"page": newPage}});
		}
	}
};
</script>