import axios from "axios";

axios.defaults.baseURL = '/api/v0/';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export default {
	getFlights: function(){
		return axios({
			method: 'get',
			url: '/flights'
		});
	},
	getFlight: function(flightId){
		return axios({
			method: 'get',
			url: '/flights/' + flightId
		});
	},
	createFlightSearch: function(data){
		return axios({
			method: 'post',
			url: '/flights',
			data: data
		});
	},
