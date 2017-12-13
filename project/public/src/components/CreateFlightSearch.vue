<!-- https://chenz24.github.io/vue-blu/#/en/components/form -->

<template>
	<el-form ref="form" v-on:submit.prevent="createFlightSearch($event, origin, destination, departure_date, return_date, quantity, type_of_trip)">
		<el-form-item label="Origin:">
			<el-input v-model="origin" maxLength="3" placeholder="Enter 3 letter airport code"></el-input>
		</el-form-item>

		<el-form-item label="Destination:">
			<el-input v-model="destination" maxLength="3" placeholder="Enter 3 letter airport code"></el-input>
		</el-form-item>
		
		<el-form-item label="Departure Date:">
			<el-input type="date" v-model="departure_date" placeholder="Flight Departure"></el-input>
			
		</el-form-item>

		<el-form-item label="Return Date:">
			<el-input type="date" v-model="return_date" placeholder="Flight Arrival"></el-input>
		</el-form-item>

		<el-form-item label="Passengers:">
			<el-input type="number" v-model="quantity" placeholder="Max: 9 people"></el-input>
		</el-form-item>

		<el-form-item label="Type of Trip:">
			
			<el-radio v-model="type_of_trip" label="ONEWAY">One Way</el-radio>
			<el-radio v-model="type_of_trip" label="ROUNDTRIP">Round Trip</el-radio>


		</el-form-item>


		<!-- <el-checkbox-group v-model="status">
			<el-checkbox-button v-for="option in options" :label="option" :key="option">{{option}}</el-checkbox-button>
		</el-checkbox-group> -->

		<!-- <el-checkbox v-model="checked1">One Way</el-checkbox>
		<el-checkbox v-model="checked2">Round Trip</el-checkbox> -->
  
		
		<el-form-item>
			<el-button type="primary" v-on:click="onSubmit($event, origin, destination, departure_date, return_date, quantity, type_of_trip)">Create Flight Search</el-button>
		</el-form-item>
	</el-form>
</template>


<script>
	
export default {
	name: 'create-flight-search',
	data: function(){
		return {
			origin:'',
			destination:'',
			departure_date: '',
			return_date: '',
			quantity: 0,
			type_of_trip: ''
		};
	},
	methods:{
		onSubmit: function(event, origin, destination, departure_date, return_date, quantity, type_of_trip){
			this.$store.dispatch("createFlightSearch", {
				data: {
					origin: origin,
					destination: destination,
					departure_date: departure_date,
					return_date: return_date,
					quantity: quantity,
					type_of_trip: type_of_trip
				}
			});
			this.$set(this, "origin", "");
			this.$set(this, "destination", "");
			this.$set(this, "departure_date", "");
			this.$set(this, "return_date", "");
			this.$set(this, "quantity", "");
			this.$set(this, "type_of_trip", "");


			
		}
	}
}
</script>