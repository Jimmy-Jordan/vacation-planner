import axios from "axios";

axios.defaults.baseURL = '/api/v0/';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default {
	flightSearch: function(data){
		console.log(data, "flight search")
		return axios({
			method: 'get',
			url: 'flights/search',
			params: data
		});
	},
	getSavedRoutes: function(){
		return axios({
			method: 'get',
			url: 'flights/savedsearch',
		});
	},
	createSavedRoute: function(data){
		console.log(data, "saved route")
		return axios({
			method: 'post',
			url: 'flights/savedsearch',
			data: data
		});
	},
	getSavedRouteDepartures: function(routeId){
		return axios({
			method: 'get',
			url: 'flights/savedsearch/' + routeId + 'departures'
		});
	},
	getSavedRouteReturns: function(routeId){
		return axios({
			method: 'get',
			url: 'flights/savedsearch/' + routeId + 'returns'
		});
	},
	createSavedRouteDepartures: function(data){
		return axios({
			method: 'post',
			url: 'flights/search',
			params: data
		});
	},
	createSavedRouteReturns: function(data){
		return axios({
			method: 'post',
			url: 'flights/search',
			params: data
		});
	},

}