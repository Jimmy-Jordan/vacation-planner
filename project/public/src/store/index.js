"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/planner.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		outboundFlights: [],
		returnFlights: [],
		tickets: {}
	},
	mutations: {
		addOutboundFlight: function(state, payload){
			state.outboundFlights.push(payload);
		},
		addReturnFlight: function(state, payload){
			state.returnFlights.push(payload);
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
					
					var outbound_flight_segment = data['FlightResponse']['FpSearch_AirLowFaresRS']
					['OriginDestinationOptions']['OutBoundOptions']['OutBoundOption'];					
					var airline_conversion = {
												'6A':'AVIACSA',
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
					for (let idx = 0; idx < outbound_flight_segment.length; idx++){
							var airline_code = outbound_flight_segment[idx]['FlightSegment'][0]['OperatedByAirline']['CompanyText']
							var airline_name = airline_conversion[airline_code]
							outbound_flight_segment[idx]['FlightSegment'][0]['OperatedByAirline']['CompanyText'] = airline_name

							context.commit("addOutboundFlight", outbound_flight_segment[idx]);
					}
					
					var return_flight_segment = data['FlightResponse']['FpSearch_AirLowFaresRS']
					['OriginDestinationOptions']['InBoundOptions']['InBoundOption'];
					
					for (let idx = 0; idx < return_flight_segment.length; idx++){
							var airline_code = return_flight_segment[idx]['FlightSegment'][0]['OperatedByAirline']['CompanyText']
							var airline_name = airline_conversion[airline_code]
							return_flight_segment[idx]['FlightSegment'][0]['OperatedByAirline']['CompanyText'] = airline_name

							context.commit("addReturnFlight", return_flight_segment[idx]);
					}
					
					var segment_pricing = data['FlightResponse']['FpSearch_AirLowFaresRS']
					['SegmentReference']['RefDetails'];

					for (let idx = 0; idx < segment_pricing.length; idx++){
							context.commit("addTickets", segment_pricing[idx]);
					}
					resolve();


				}).catch(function(){
					reject();
				});
			});
			
		},
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
		
	},
	getters: {
		getOutboundFlights: function(state, getters){
			return state.outboundFlights;
		},
		getReturnFlights: function(state, getters){
			return state.returnFlights;
		},
		getTicket: function(state, getters){
			return function(Segmentid){
				var ticket = state.tickets[Segmentid];
				return ticket
			}
		},
		
	}
});

export default store;