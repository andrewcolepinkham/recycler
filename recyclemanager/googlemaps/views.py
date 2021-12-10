from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['GET', 'POST'])
def places_list(request, format=None):
    
    if request.method == 'POST':
        print(request.data)
        lat = request.data['lat']
        lng = request.data['lng']
        url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        location = 'location='+ str(lat) + ',' + str(lng)
        radius = '&radius=' + str(request.data['radius'])
        type = '&keyword=' + str(request.data['keyword'])
        key = '&key=AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U'
        searchUrl = url + location + radius + type + key
        response = requests.get(searchUrl).json()
        return Response(response)