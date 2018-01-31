
<template>
	<el-form ref="form" size="mini" label-width="120px" style="width: 40%;"v-on:submit.prevent="flightSearch($event, origin, destination, departure_date, return_date, quantity, type_of_trip); createSavedRoute($event, origin, destination, quantity, type_of_trip);">
		<el-form-item label="Origin:">
			<el-input v-model="origin" maxLength="3" placeholder="3-Letter Airport Code"></el-input>
		</el-form-item>

		<el-form-item label="Destination:">
			<el-input v-model="destination" maxLength="3" placeholder="3-Letter Airport Code"></el-input>
		</el-form-item>
		
		<el-form-item label="Departure Date:">
			<el-input type="date" v-model="departure_date" placeholder="Flight Departure"></el-input>
			
		</el-form-item>

		<el-form-item label="Return Date:">
			<el-input type="date" v-model="return_date" placeholder="Flight Arrival"></el-input>
		</el-form-item>

		<el-form-item label="Passengers:">
			<el-input type="number" v-model="quantity" placeholder="Max: 9 People"></el-input>
		</el-form-item>

		<el-form-item label="Status:">
			
			<el-radio v-model="type_of_trip" label="ONEWAYTRIP">One Way</el-radio>
			<el-radio v-model="type_of_trip" label="ROUNDTRIP">Round Trip</el-radio>


		</el-form-item>
  
		
		<el-form-item>
			<el-button type="primary" icon="el-icon-search" v-on:click="onSubmit($event, origin, destination, departure_date, return_date, quantity, type_of_trip)">Search Flights</el-button>
		</el-form-item>
	</el-form>
</template>


<script>
	
export default {
	name: 'flight-search',
	data: function(){
		return {
			origin:'',
			destination:'',
			departure_date: '',
			return_date: '',
			quantity: 0,
			type_of_trip: '',
		};
	},
	methods:{
		onSubmit: function(event, origin, destination, departure_date, return_date, quantity, type_of_trip){
			this.$store.dispatch("flightSearch", {
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
			this.$store.dispatch("createSavedRoute", {
				data: {
					origin: origin,
					destination: destination,
					quantity: quantity,
					type_of_trip: type_of_trip
				}
			});
			this.$set(this, "origin", "");
			this.$set(this, "destination", "");
			this.$set(this, "quantity", "");
			this.$set(this, "type_of_trip", "");

			
		},
		// databaseSave: function(event, origin, destination, quantity, type_of_trip){
		// 	this.$store.dispatch("createSavedRoute", {
		// 		data3: {
		// 			origin: origin,
		// 			destination: destination,
		// 			quantity: quantity,
		// 			type_of_trip: type_of_trip
		// 		}
		// 	});
		// 	this.$set(this, "origin", "");
		// 	this.$set(this, "destination", "");
		// 	this.$set(this, "quantity", "");
		// 	this.$set(this, "type_of_trip", "");
		// }
	}
}
</script>