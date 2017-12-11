from rest_framework import serializers
from planner.models import SavedFlightSearch

class FlightSearchSerializer(serializers.ModelSerializer):
    
    user = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)

    class Meta:
        model = SavedSavedFlightSearch
        fields = [
        	'destination', 'origin', 'quantity', 'type_of_trip', 
        	'departure_date', 'return_date', 'id', 'user'
        ]
        read_only_fields = ('id')