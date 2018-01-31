<template v-bind:style="[backgroundStyle]">	
	<el-row>
		<el-col :offset="0" :span="12">
			<ul>
				<li 
					is="saved-flight-route-summary" 
					v-for="item in savedRoutes" 
					v-bind:savedRoute="item">
				</li>
			</ul>
			<el-pagination
				v-model="current"
				:page-count="totalPages"
				:page-size="perPage"
				layout="prev, pager, next"
				v-on:current-change="currentChange"
				v-bind:style="[fontStyle]"
			>
			</el-pagination>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: "user-profile",
	data: function(){
		return {
			current: parseInt(this.$route.query.page) || 1,
			perPage: 10,
			backgroundStyle: {
				backgroundColor: '#fbfbf2'
			},
			fontStyle: {
				fontSize: '16px',
				padding: '20px 445px',
				textAlign: 'center',
			}
		}
	},
	computed: {
		totalPages: function(){
			return Math.ceil(this.$store.getters.getSavedRoutes.length  / this.perPage);
		},
		savedRoutes: function(){
			var routes, chunkStart, chunkEnd;
			routes = this.$store.getters.getSavedRoutes;
			chunkStart = (this.current - 1) * this.perPage;
			chunkEnd = chunkStart + this.perPage;
			return routes.slice(chunkStart, chunkEnd);
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