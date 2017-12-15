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
					console.log(flight_segment)
					
					var airline_conversion = {'6A':'AVIACSA',
												'9K':'Cape Air',
												'A0':'L Avion',
												'A7':'Air Plus Comet',
												'AA':'American',
												'AC':'Air Canada',
												'AF':'Air France',
												'AI':'Air India',
												'AM':'Aeromexico',
												'AR':'Aerolineas Argentinas',
												'AS':'Alaska',
												'AT':'Royal Air Maroc',
												'AV':'Avianca',
												'AY':'Finnair',
												'AZ':'Alitalia',
												'B6':'JetBlue',
												'BA':'British Airways',
												'BD':'bmi british midland',
												'BR':'EVA Airways',
												'C6':'CanJet Airlines',
												'CA':'Air China',
												'CI':'China',
												'CO':'Continental',
												'CX':'Cathay',
												'CZ':'China Southern',
												'DL':'Delta',
												'EI':'Aer Lingus',
												'EK':'Emirates',
												'EO':'EOS',
												'F9':'Frontier',
												'FI':'Icelandair',
												'FJ':'Air Pacific',
												'FL':'AirTran',
												'G4':'Allegiant',
												'GQ':'Big Sky',
												'HA':'Hawaiian',
												'HP':'America West',
												'HQ':'Harmony',
												'IB':'Iberia',
												'JK':'Spanair',
												'JL':'JAL',
												'JM':'Air Jamaica',
												'KE':'Korean',
												'KU':'Kuwait',
												'KX':'Cayman',
												'LA':'LanChile',
												'LH':'Lufthansa',
												'LO':'LOT',
												'LT':'LTU',
												'LW':'Pacific Wings',
												'LX':'SWISS',
												'LY':'El Al',
												'MA':'MALEV',
												'MH':'Malaysia',
												'MU':'China Eastern',
												'MX':'Mexicana',
												'NH':'ANA',
												'NK':'Spirit',
												'NW':'Northwest',
												'NZ':'Air New Zealand',
												'OS':'Austrian',
												'OZ':'Asiana',
												'PN':'Pan American',
												'PR':'Philippine',
												'QF':'Qantas',
												'QK':'Air Canada Jazz',
												'RG':'VARIG',
												'SA':'South African',
												'SK':'SAS',
												'SN':'SN Brussels',
												'SQ':'Singapore',
												'SU':'Aeroflot',
												'SY':'Sun Country',
												'TA':'Taca',
												'TG':'Thai',
												'TK':'Turkish',
												'TN':'Air Tahiti Nui',
												'TP':'TAP',
												'TS':'Air Transat',
												'U5':'USA 3000',
												'UA':'United',
												'UP':'Bahamasair',
												'US':'US Air',
												'V3':'Copa',
												'VS':'Virgin Atlantic',
												'VX':'Virgin America',
												'WA':'Western',
												'WN':'Southwest',
												'WS':'WestJet',
												'XE':'ExpressJet',
												'Y2':'Globespan',
												'Y7':'Silverjet',
												'YV':'Mesa',
												'YX':'Midwest',
												'ZK':'Great Lakes',

											}
					// var airline_code = flight_segment[0]['FlightSegment']['OperatedByAirline']['CompanyText']
					// console.log(airline_code)
					for (let idx = 0; idx < flight_segment.length; idx++){
							var airline_code = flight_segment[idx]['FlightSegment'][0]['OperatedByAirline']['CompanyText']
							var airline_name = airline_conversion[airline_code]
							flight_segment[idx]['FlightSegment'][0]['OperatedByAirline']['CompanyText'] = airline_name

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