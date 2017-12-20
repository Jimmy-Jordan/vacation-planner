import Vue from 'vue';
import VueRouter from 'vue-router';

import DataStore from '../store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		// {
		// 	name: "flights",
		// 	path: "/",
		// 	components: {
		// 		"header": {"template": '<h2 class="align-center">Flight Collection</h2>'},
		// 		"aside": {"template": "<default-navbar></default-navbar>"},
		// 		"main": {"template": "<flight-collection></flight-collection>"}
		// 	},
		// },
		{
			name: "flight-search",
			path: "/",
			components: {
				"header": {"template": '<h2 class="align-center">Flight Search</h2>'},
				"aside": {"template": "<default-navbar></default-navbar>"},
				"main": {"template": `
				<div>
				<flight-search></flight-search>
				<outbound-flight-results></outbound-flight-results>
				</div>`

				},	

			}
		},
		{
			name: "profile",
			path: "/profile",
			components: {
				"header": { "template": '<h2 class="align-center">User Profile</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { "template": "<p>Placeholder</p>" }
			}
		},
		{
			name: "return-flight-selection",
			path: "/flights/:id",
			name: "outboundFlight",
			components: {
				"header": {"template": '<h2 class="align-center">Return Flight Selection</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { "template": `
				 <div>
				 <return-flight-options></return-flight-options>
				 </div>
				 `
			},
			props: {
				main: true
			},
			// beforeEnter: function(to, from, next){
			// 	console.log(to)
			// 	console.log(String(to.params))
			// 	console.log("hi")
			// 	console.log(to.params.id)
			// 	console.log(to.params.Segmentid)
			// 	var outboundFlight = DataStore.getters.getOutboundFlight(to.params.Segmentid);
			// 	console.log(outboundFlight)
			// 	//Might need JS equivalent of str method
			// 	console.log(to)
			// 	if (outboundFlight){
			// 		to.params.outboundFlight = outboundFlight;
			// 		// if (!Object.hasOwnProperty.call(event, "attendees")){
			// 		// 	DataStore.dispatch("loadAttendees", {
			// 		// 		event: event
			// 		// 	}).then(function(){
			// 		// 		next();
			// 		// 	});
			// 		// } else {
			// 		// 	next();
			// 		// }
			// 	} else {
			// 		console.log("error");
			// 		next();
			// 		// next({name: '404'});
			// 	}
			// }
			}

		},
		// {
		// 	name: "city-detail",
		// 	path: '/flights/:id',
		// 	name: 'city-detail',
		// 	components: 
		// 	{
		// 		"header": { "template": '<h2 class="align-center">City Detail</h2>'},
		// 		"aside": { "template": "<default-navbar></default-navbar>"},
		// 		"main": { "template": "<city-detail></city-detail>" }
		// 	},
		// 	props: true,
		// 	beforeEnter: function(to, from, next){
		// 		flight = DataStore.getters.getFlight(parseInt(to.params.id));
		// 		if (flight){
		// 			to.params.flight = event;
		// 			if (!Object.hasOwnProperty.call(flight, "attendees")){
		// 				DataStore.dispatch("loadAttendees", {
		// 					event: event
		// 				}).then(function(){
		// 					next();
		// 				});
		// 			} else {
		// 				next();
		// 			}
		// 		} else {
		// 			console.log("error");
		// 			// next({name: '404'});
		// 		}
		// 	}
		// },
		{
			path: '/error',
			name: '404',
			components: {
				"main": { "template": '<p>Not Found</p>' }
			}
		}
	]
});

export default router;