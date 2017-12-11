from django import forms

class SubmitFlightSearch(forms.Form):
    url = forms.URLField()