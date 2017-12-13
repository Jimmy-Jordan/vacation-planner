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
			// beforeEnter: function(to, from, next){
			// 	if (DataStore.getters.getFlights.length){
			// 		next();
			// 	} else {	
			// 		DataStore.dispatch('loadFlights').then(function(){
			// 			next();
			// 		});
			// 	}
			// }
		// },
		{
			name: "create-flight-search",
			path: "/create-flight-search",
			components: {
				"header": {"template": '<h2 class="align-center">Flight Search</h2>'},
				"aside": {"template": "<default-navbar></default-navbar>"},
				"main": {"template": `<div>
				<create-flight-search></create-flight-search>
				<flight-collection></flight-collection>
				</div>`}

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
			name: "city-detail",
			path: '/flights/:id',
			name: 'city-detail',
			components: 
			{
				"header": { "template": '<h2 class="align-center">City Detail</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { "template": "<city-detail></city-detail>" }
			},
			props: true,
			beforeEnter: function(to, from, next){
				flight = DataStore.getters.getFlight(parseInt(to.params.id));
				if (flight){
					to.params.flight = event;
					if (!Object.hasOwnProperty.call(flight, "attendees")){
						DataStore.dispatch("loadAttendees", {
							event: event
						}).then(function(){
							next();
						});
					} else {
						next();
					}
				} else {
					console.log("error");
					// next({name: '404'});
				}
			}
		},
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