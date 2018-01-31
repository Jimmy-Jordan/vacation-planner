from rest_framework import serializers
from planner.models import SavedFlightRoute, DepartureEstimate, ReturnEstimate


class FlightSearchSerializer(serializers.Serializer):
	response_version = serializers.CharField(max_length=9, default="VERSION41")
	destination = serializers.CharField(max_length=3)
	departure_time = serializers.TimeField(default="1100")
	origin = serializers.CharField(max_length=3)
	quantity = serializers.IntegerField()
	type_of_trip = serializers.CharField(max_length=10)
	departure_date = serializers.DateField()
	return_date = serializers.DateField(required=False)

	def flight_search_parser(self):
		print("before_parser")
		if self.data["type_of_trip"] == "ROUNDTRIP" and self.is_valid():
			data = self.data
			unixTC = "T00:00:00"

			segment_details = []
			departure = {}
			returnfrom = {}

			FlightSearchRequest = {}

			departure["Origin"] = data['origin']
			departure["Destination"] = data['destination']
			departure["DepartureDate"] = data['departure_date'] 
			departure["DepartureTime"] = data['departure_time']

			returnfrom["Origin"] = data['destination']
			returnfrom["Destination"] = data['origin']
			returnfrom["DepartureDate"] = data['return_date'] 
			returnfrom["DepartureTime"] = data['departure_time']
			
			segment_details.append(departure)
			segment_details.append(returnfrom)
			

			FlightSearchRequest["Adults"] = str(data['quantity'])
			FlightSearchRequest["ClassOfService"] = "ECONOMY"
			FlightSearchRequest["TypeOfTrip"] = data['type_of_trip']
			FlightSearchRequest["SegmentDetails"] = segment_details

		  

			# ["ResponseVersion"] = data['response_version']
			# ["FlightSearchRequest"] = FlightSearchRequest



			return FlightSearchRequest

		elif self.is_valid():     
			data = self.data
			segment_details = []
			departure = {}
			returnfrom = {}

			FlightSearchRequest = {}

			departure["Origin"] = data['origin']
			departure["Destination"] = data['destination']
			departure["DepartureDate"] = data['departure_date'] 
			departure["DepartureTime"] = data['departure_time']  

			segment_details.append(departure)
			
			FlightSearchRequest["Adults"] = str(data['quantity'])
			FlightSearchRequest["ClassOfService"] = "ECONOMY"
			FlightSearchRequest["TypeOfTrip"] = data['type_of_trip']
			FlightSearchRequest["SegmentDetails"] = segment_details

			return FlightSearchRequest                        

	def response_parser(self):

		if self.is_valid():
			data = self.data

			ResponseVersion = data['response_version']
			return ResponseVersion







class SavedFlightRouteSerializer(serializers.ModelSerializer):
	
	user = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)

	#Might need a HyperlinkedIdentityField here so when you click on the Saved Flight Route it will load all the selected flights

	class Meta:
		model = SavedFlightRoute
		fields = [
			'type_of_trip', 'destination', 'origin', 'quantity', 
			'id', 'user'
		]
		read_only_fields = ('id', 'user')

class DepartureEstimateSerializer(serializers.ModelSerializer):

	class Meta:
		model = DepartureEstimate
		fields = ('airline', 'estimated_roundtrip', 'flight_time', 'search_timestamp', 'direct_flight', 'flight_route')		

class ReturnEstimateSerializer(serializers.ModelSerializer):

	class Meta:
		model = DepartureEstimate
		fields = ('airline', 'estimated_roundtrip', 'flight_time', 'search_timestamp', 'direct_flight', 'flight_route')


     