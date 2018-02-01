import pprint
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.generic import View

from rest_framework import generics, permissions
from rest_framework.renderers import JSONRenderer
# from rest_framework.views import View

from project.local_settings import APIAuthentication

from planner.wrapper import Wrapper
from planner.models import (
	SavedFlightRoute, DepartureEstimate, ReturnEstimate
)
from planner.serializers import (
	FlightSearchSerializer, SavedFlightRouteSerializer, 
	DepartureEstimateSerializer, ReturnEstimateSerializer
)
from planner.permissions import IsOwner



class FlightSearchAPIView(View):
	'''
	Call the wrapper
	save the response in a variable
	parse the response for the data you want if needed (unlikely here)
	send the data to the browser
	cache the results if possible (do later)
	'''

	def get(self, request):
		wrapper = Wrapper(
			username = APIAuthentication.USERNAME, 
			password = APIAuthentication.PASSWORD
		)

		serializer = FlightSearchSerializer(data=request.GET)
		if serializer.is_valid():
			print(self.request.user)
			flight_search_request = serializer.flight_search_parser()
			response_version = serializer.response_parser()
			search = wrapper.flight_availability_search(response_version, flight_search_request)
			# pp = pprint.PrettyPrinter(indent=2)
			# pp.pprint(search)
			return JsonResponse(search)
		else:
			return JsonResponse(serializer.errors, status=405)


class FlightRouteListView(generics.ListCreateAPIView):

	queryset = SavedFlightRoute.objects.all()
	serializer_class = SavedFlightRouteSerializer
	permission_classes = (IsOwner,)

	
	def perform_create(self, serializer):
		serializer.save(user=self.request.user)
	#Might have to adjust the permission so you must be Owner to read

class FlightRouteDepartureListView(generics.ListCreateAPIView):

	queryset = DepartureEstimate.objects.all()
	serializer_class = DepartureEstimateSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class FlightRouteReturnListView(generics.ListCreateAPIView):

	queryset = ReturnEstimate.objects.all()
	serializer_class = ReturnEstimateSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)		


			