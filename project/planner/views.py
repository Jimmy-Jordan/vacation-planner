from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions


from planner.wrapper import Wrapper
from planner.serializers import FlightSearchSerializer
from planner.forms import SubmitFlightSearch



# class FlightListView(generics.ListCreateAPIView):
# 	'''
# 	Separate table for results of flight search?
# 	Set up permissions to allow non-users to perform flight searches, 
# 	but not save? Generic permissions probably fine
# 	'''
# 	queryset = .objects.all()
# 	serializer_class = FlightSearchSerializer
# 	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# 	def perform_save(self, serializer):
# 		serializer.save(user=self.request.user)	

class SavedFlightSearch():


	#Incoporate Wrapper
	def save_flight(request):
		if request.method == "POST":
			form = SubmitFlightSearch(request.POST)
			if form.is_valid():
				url = form.cleaned_data['url']
				r = requests.get('http://api.embed.ly/1/oembed?key=' + settings.EMBEDLY_KEY + '&url=' + url)
				json = r.json()
				serializer = FlightSearchSerializer(data=json)
				if serializer.is_valid():
					flight = serializer.save()
					return render(request, 'embeds.html', {'embed': embed})

		else:
			form = SubmitFlightSearch()

		return render(request, 'index.html', {'form': form})		