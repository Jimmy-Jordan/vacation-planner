"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/planner.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		flights: [],
		tickets: {}
	},
	mutations: {
		createFlightSearch: function(state, payload){
			state.flights.push(payload);
		},
		loadFlights: function(state, payload){
			Vue.set(state, 'flights', payload.data);
		},
		addTickets: function(state, payload){
			state.tickets[payload.OutBoundOptionId[0]] = payload;
		},
		// loadAttendees: function(state, payload){
		// 	Vue.set(payload.obj, 'attendees', payload.data);
		// },
		// editEvent: function(state, payload){
		// 	Object.assign(payload.obj, payload.data);
		// },
		// createAttendee: function(state, payload){
		// 	payload.obj.attendees.push(payload.data);
		// },
		// editAttendee: function(state, payload){
		// 	Object.assign(payload.obj, payload.data);
		// },
		// deleteEvent: function(state, payload){
		// 	for (let idx = 0; idx < state.events.length; idx++){
		// 		if (state.events[idx].id === payload.target.id){
		// 			state.events.splice(idx, 1);
		// 			return;
		// 		}
		// 	}
		// }
	},
	actions: {
		createFlightSearch: function(context, payload){
			return new Promise(function(resolve, reject){
				api.createFlightSearch(payload.data).then(function({request,data}){
					var flight_segment = data['FlightResponse']['FpSearch_AirLowFaresRS']
					['OriginDestinationOptions']['OutBoundOptions']['OutBoundOption'];
					// console.log(flight_segment)
					for (let idx = 0; idx < flight_segment.length; idx++){
							context.commit("createFlightSearch", flight_segment[idx]);
					}
					var segment_pricing = data['FlightResponse']['FpSearch_AirLowFaresRS']
					['SegmentReference']['RefDetails'];
					console.log(segment_pricing)
					for (let idx = 0; idx < segment_pricing.length; idx++){
							context.commit("addTickets", segment_pricing[idx]);
					}
					resolve();


				}).catch(function(){
					reject();
				});
			});
			
		},
		// editEvent: function(context, payload){
		// 	return new Promise(function(resolve, reject){
		// 		api.editEvent(payload.event.id, payload.data).then(function({request, data}){
		// 			context.commit("editEvent", {
		// 				obj: payload.event,
		// 				data: data
		// 			});
		// 			resolve();
		// 		}).catch(function(){
		// 			reject();
		// 		});
		// 	});
		// },
		// deleteEvent: function(context, payload){
			
		// 	return new Promise(function(resolve, reject){
		// 		api.deleteEvent(payload.event.id).then(function(){
		// 			context.commit("deleteEvent", {
		// 				target: payload.event
		// 			});
		// 		}).catch(function(){
		// 			reject();
		// 		});
		// 	});
		// },
		// createAttendee: function(context, payload){
		// 	return new Promise(function(resolve, reject){
		// 		api.createAttendee(payload.event.id, payload.data).then(function({request, data}){
		// 			context.commit("createAttendee", {
		// 				obj: payload.event,
		// 				data: data
		// 			});
		// 			resolve(data);
		// 		}).catch(function(){
		// 			reject();
		// 		});
		// 	});	
		// },
		// editAttendee: function(context, payload){
		// 	return new Promise(function(resolve, reject){	
		// 		api.editAttendee(payload.attendee.id, payload.data).then(function({request, data}){
		// 			context.commit("editAttendee", {
		// 				obj: payload.attendee,
		// 				data: data
		// 			});
		// 			resolve(data);
		// 		}).catch(function(){
		// 			reject();
		// 		});
		// 	});	
		// },
		loadFlights: function(context, payload){
			return new Promise(function(resolve, reject){			
				api.getFlights().then(function({data,request}){
					

					context.commit("loadFlights", {
						
						"data": data
					});
					resolve(data);
				}).catch(function(){
					reject();
				});
			});
		},
		// loadAttendees: function(context, payload){
		// 	return new Promise(function(resolve, reject){
		// 		var attendees = api.getEventAttendees(payload.event.id);
		// 		attendees.then(function({data, request}){
		// 			context.commit("loadAttendees", {
		// 				"obj": payload.event,
		// 				"data": data
		// 			});
		// 			resolve(data);
		// 		}).catch(function(){
		// 			reject();
		// 		});
		// 	});	
		// }
	},
	getters: {
		getFlights: function(state, getters){
			return state.flights;
		},
		getFlight: function(state, getters){
			return function(flightId){
				var flights = state.flights;
				return flights.find(function(element){
					if (element.id === flightId){
						return element;
					}
				})
			}
		},
		// getAttendee: function(state, getters){
		// 	return function(eventId, attendeeId){
		// 		var event = getters.getEvent(eventId);
		// 		if (event){
		// 			return event.attendees.find(function(element){
		// 				if (element.id === attendeeId){
		// 					return element;
		// 				}
		// 			});
		// 		}
		// 	}
		// },
		// getAttendees: function(state, getters){
		// 	return function(eventId){
		// 		var event = getters.getEvent(eventId);
		// 		if (event){
		// 			return event.attendees
		// 		}
		// 	}
		// },
	}
});

export default store;