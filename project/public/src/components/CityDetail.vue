
<template>
	
	<div> <p> City of Interest : </p>
		<h4> Departure Details </h4>
		<p>From : Departure City or Airport</p>
		<p> Flight one: City and Date and Price </p>  
		<p>If there is a layover: flight 2 details</p> 

		 <br>

		 <h4> Return Details </h4>
		<p> : Departure City or Airport</p>
		<p> Flight one: City and Date </p>  <p>If there is a layover: flight 2 details
		 </p> 

</div>
</template>


<script>
export default {
	name: "city-detail",
	props:{
		recipe: Object
	}
};
</script>