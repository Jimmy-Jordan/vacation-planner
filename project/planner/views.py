from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.generic import View
import pprint

from rest_framework import generics, permissions
from rest_framework.renderers import JSONRenderer
# from rest_framework.views import View

from planner.wrapper import Wrapper
from planner.serializers import FlightSearchSerializer
from project.local_settings import APIAuthentication


class FlightSearchAPIListView(View):

		#Call the wrapper
		#save the response in a variable
		#parse the response for the data you want if needed (unlikely here)
		#send the data to the browser
		#cache the results if possible (do later)

	# serializer_class = FlightSearchSerializer
	# permission_classes = (permissions.AllowAny,)


	def get(self, request):

		wrapper = Wrapper(
			username = APIAuthentication.USERNAME, 
			password = APIAuthentication.PASSWORD
		)

		serializer = FlightSearchSerializer(data=request.GET)
		if serializer.is_valid():
			
			flight_search_request = serializer.flight_search_parser()
			response_version = serializer.response_parser()
			
			
			search = wrapper.flight_availability_search(response_version, flight_search_request)
			pp = pprint.PrettyPrinter(indent=4)
			pp.pprint(search)
			print("are you kidding me")
		

			return JsonResponse(search)
		else:
			return JsonResponse(serializer.errors, status=405)

	


	# def post(self, request):

	# 	wrapper = Wrapper(
	# 		username = APIAuthentication.USERNAME,
	# 		password = APIAuthentication.PASSWORD
	# 	)
	# 	print(request.POST, "YAYYYYY-----------------------------------------------", request.body)
	# 	serializer = FlightSearchSerializer(data=request.POST)


# class SavedFlightListView(generics.ListCreateAPIView):
# 	'''
# 	Change permission to only be if authenticated?
# 	'''
# 	queryset = SavedFlightSearch.objects.all()
# 	serializer_class = SavedFlightSearchSerializer
# 	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# 	def perform_save(self, serializer):
# 		serializer.save(user=self.request.user)	



			