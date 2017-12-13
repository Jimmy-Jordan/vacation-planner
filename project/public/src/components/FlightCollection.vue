<template>	
	<el-row>
		<el-col :offset="6" :span="12">
			<ul>
				<li 
					is="flight-summary" 
					v-for="flight in flights" 
					v-bind:flight="flight">
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
		</el-col>
	</el-row>
</template>


<script>
export default {
	name: "flight-collection",
	data: function(){
		return {
			current: parseInt(this.$route.query.page) || 1,
			perPage: 10
		}
	},
	computed: {
		totalPages: function(){
			return Math.ceil(this.$store.getters.getFlights.length  / this.perPage);
		},
		flights: function(){
			var flights, chunkStart, chunkEnd;
			flights = this.$store.getters.getFlights;
			chunkStart = (this.current - 1) * this.perPage;
			chunkEnd = chunkStart + this.perPage;
			return flights.slice(chunkStart, chunkEnd);
		}
	},
	methods: {
		"currentChange": function(newPage){
			this.$set(this, "current", newPage);
		}
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