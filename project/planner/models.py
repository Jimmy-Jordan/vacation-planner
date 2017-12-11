from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class SavedFlightSearch(models.Model):
	ROUNDTRIP = 'Roundtrip'
	ONEWAY = 'One-way'
	TRIP_TYPE_CHOICES = (
		(ROUNDTRIP, 'ROUNDTRIP'),
		(ONEWAY, 'ONEWAY'),
	)

	response_version = models.CharField(default="VERSION41")
	destination = models.CharField(max_length=4)
	origin = models.CharField(max_length=4)
	quantity = models.PositiveIntegerField()
	#Through API max is 9 tickets I believe?
	type_of_trip = models.CharField(
		max_length=2, choices=TRIP_TYPE_CHOICES, default=ROUNDTRIP
	)
	departure_date = models.DateField()
	return_date = models.DateField()
	user = models.ForeignKey(User)

#class RecreationalInterests(models.Model):



