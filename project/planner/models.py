from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class SavedFlightRoute(models.Model):

	trip_type = models.CharField(max_length=10)
	response_version = models.CharField(max_length=9, default="VERSION41")
	destination = models.CharField(max_length=4)
	origin = models.CharField(max_length=4)
	passengers = models.PositiveSmallIntegerField()
	# departure_date = models.DateField()
	# return_date = models.DateField()
	user = models.ForeignKey(User, on_delete=models.PROTECT)

class DepartureEstimate(models.Model):

	airline = models.CharField(max_length=50)
	estimated_roundtrip = models.FloatField()
	flight_time = models.DateTimeField(auto_now=False, auto_now_add=False)
	search_timestamp = models.DateTimeField(default=timezone.now)
	direct_flight = models.BooleanField()
	flight_route = models.ForeignKey(SavedFlightRoute, on_delete=models.PROTECT)

class ReturnEstimate(models.Model):
	airline = models.CharField(max_length=50)
	estimated_roundtrip = models.FloatField()
	flight_time = models.DateTimeField(auto_now=False, auto_now_add=False)
	search_timestamp = models.DateTimeField(default=timezone.now)
	direct_flight = models.BooleanField()
	flight_route = models.ForeignKey(SavedFlightRoute, on_delete=models.PROTECT)

