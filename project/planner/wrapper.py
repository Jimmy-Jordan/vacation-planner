import requests
import base64
import json

from project.local_settings import APIAuthentication



class Wrapper:
	
	BASE_URL = "https://api-dev.fareportallabs.com/air/api/"

	def __init__(self, username, password):
		self.username = APIAuthentication.USERNAME
		self.password = APIAuthentication.PASSWORD
		
		
	def authorization_preperation(self):

		validation_str = (self.username + ":" + self.password)
		svc_credential = base64.b64encode(validation_str.encode()).decode()
		return "Basic {}".format(svc_credential)
		
	def get_headers(self):
		return {
			"Authorization": self.authorization_preperation(),
			"Content-Type": "application/json"
		}

	def fare_verification(self, flight_verification_rq):
		url = self.BASE_URL + "book/verifyflight"

		data = dict(
			FlightVerificationRQ=flight_verification_rq
		)

		headers = self.get_headers()

		response = requests.post(url, data=json.dumps(data), headers=headers)

		if response.status_code in range(200, 300):
			return response.json()

		return {"status_code": response.status_code, "message": response.message}

	def flight_availability_search(self, response_version, flight_search_request):
		url = self.BASE_URL + "search/searchflightavailability" 
		# obj here is a data 
		# input validation2
		# total_passengers = int(flight_search_request["Adults"]) + int(flight_search_request["Child"]) + int(flight_search_request["InfantInLap"]) + int(flight_search_request["InfantOnSeat"]) + int(flight_search_request["Seniors"])
		# adults = int(flight_search_request["Adults"]) + int(flight_search_request["Seniors"])
		# infant = int(flight_search_request["InfantInLap"]) + int(flight_search_request["InfantOnSeat"])

		# handle validations later
		# if total_passengers <= 9 and adults >= 1:
		# 	if infant // adults <= 2:
		# 		if flight_search_request["TypeOfTrip"] = "ROUNDTRIP":
		# 			len()
		data = dict(
			ResponseVersion=response_version, FlightSearchRequest=flight_search_request
		)

		headers = self.get_headers()

		response = requests.post(url, data=json.dumps(data), headers=headers)
		
		if response.status_code in range(200, 300):
			return response.json()
		
		return {"status_code": response.status_code, "message": response.message}



def main():
	wrapper = Wrapper(
		username = APIAuthentication.USERNAME, 
		password = APIAuthentication.PASSWORD
	)

	lookup = wrapper.flight_availability_search("VERSION41", {
		"Adults": "1",
		# "Child": "0",
		# "Youths": "0",
		"ClassOfService": "ECONOMY",
		# "InfantInLap": "0",
		# "InfantOnSeat": "0",
		# "Seniors": "0",
		"TypeOfTrip": "ROUNDTRIP",
		"SegmentDetails": [
				{
					"DepartureDate": "2017-12-23",
					"DepartureTime": "1100",
					"Destination": "JFK",
					"Origin": "LHR"
				},
				{
					"DepartureDate": "2018-01-09",
					"DepartureTime": "1100",
					"Destination": "LHR",
					"Origin": "JFK"
				}
			]
		}
	)



	fare_verification = wrapper.fare_verification({
			   "ContractId": "0",
			   "ContractLocatorKey": "c1641a60-a44d-4f96-934c-2fa2df2b1566",
			   "IsInsuranceSelected": "true",
			   "DoFareVerification":"false",
			   "IsTravelAssistClassicSelected":"true",
		"IsTravelAssistSelected":"false"
	})


	print(fare_verification)

if __name__ == '__main__':
	main()