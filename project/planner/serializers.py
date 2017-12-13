from rest_framework import serializers
from planner.models import SavedFlightSearch


class FlightSearchSerializer(serializers.Serializer):
    response_version = serializers.CharField(max_length=9, default="VERSION41")
    destination = serializers.CharField(max_length=3)
    origin = serializers.CharField(max_length=3)
    quantity = serializers.IntegerField()
    type_of_trip = serializers.CharField(max_length=9)
    departure_date = serializers.DateField()
    return_date = serializers.DateField()    

class SavedFlightSearchSerializer(serializers.ModelSerializer):
    
    user = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)

    class Meta:
        model = SavedFlightSearch
        fields = [
        	'destination', 'origin', 'quantity', 'type_of_trip', 
        	'departure_date', 'return_date', 'id', 'user'
        ]
        read_only_fields = ('id',)


#Do we need a model to base the serializer on? Examples online mostly show using a model
#Should we be using the model for saving flights? If so, is it possible to use the
#FlightSearchSerializer? Or should I make one serializer for the API request, one for saving,
#one for deserializing, etc.
#Would a ListSerializer (per DRF docs) be good for deserializing that amount of data?         