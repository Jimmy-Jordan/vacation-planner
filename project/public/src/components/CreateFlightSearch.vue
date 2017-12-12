<!-- https://chenz24.github.io/vue-blu/#/en/components/form -->

<template>
	<el-form ref="form" v-on:submit.prevent="createFlightSearch($event, from, to, departure, arrival, quantity, status)">
		<el-form-item label="From:">
			<el-input v-model="from" placeholder="Flight From"></el-input>
		</el-form-item>

		<el-form-item label="To:">
			<el-input v-model="to" placeholder="Flight To"></el-input>
		</el-form-item>
		
		<el-form-item label="Departure:">
			<el-input v-model="departure" placeholder="Flight Departure"></el-input>
			
		</el-form-item>

		<el-form-item label="Arrival:">
			<el-input v-model="arrival" placeholder="Flight Arrival"></el-input>
		</el-form-item>

		<el-form-item label="Status:">
			
  			<el-radio v-model="status" label="1">One Way</el-radio>
  			<el-radio v-model="status" label="2">Round Trip</el-radio>


		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" v-on:click="onSubmit($event, from, to, departure, arrival, quantity, status)">Create Flight Search</el-button>
		</el-form-item>
	</el-form>
</template>


<script>
export default {
	name: 'create-flight-search',
	data: function(){
		return {
			from:'',
			to:'',
			departure: '',
			arrival: '',
			quantity: '',
			status: ''

		};
	},
	methods:{
		onSubmit: function(event, from, to, departure, arrival, quantity, status){
			this.$store.dispatch("createFlightSearch", {
				data: {
					from: from,
					to: to,
					departure: departure,
					arrival: arrival,
					quantity: quantity,
					status: status
				}
			});
			this.$set(this, "from", "");
			this.$set(this, "to", "");
			this.$set(this, "departure", "");
			this.$set(this, "arrival", "");
			this.$set(this, "quantity", "");
			this.$set(this, "status", "");


			
		}
	}
}
</script>