from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions


from planner.wrapper import Wrapper
from planner.serializers import FlightSearchSerializer
from planner.forms import SubmitFlightSearch

class FlightSearchAPIListView(generics.ListAPIView):

	serializer_class = FlightSearchSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def send_flight_data(request):

		#Call the wrapper
		#save the response in a variable
		#parse the response for the data you want if needed (unlikely here)
		#send the data to the browser
		#cache the results if possible (do later)


class SavedFlightListView(generics.ListCreateAPIView):
	'''
	Change permission to only be if authenticated?
	'''
	queryset = SavedFlightSearch.objects.all()
	serializer_class = SavedFlightSearchSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def perform_save(self, serializer):
		serializer.save(user=self.request.user)	



			