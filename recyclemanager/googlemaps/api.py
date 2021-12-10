# from submissions.models import Place
from rest_framework import viewsets
from rest_framework.response import Response
import requests

class PlacesAPI(viewsets.ViewSet):
    # serializer_class = PlacesSerializer

    def list(self, request):
        print(self.request.data)
        lat = 38.8598724
        lng = -104.8230056
        url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        location = 'location='+ str(lat) + ',' + str(lng)
        radius = '&radius=2000'
        type = '&keyword=recycling'
        key = '&key=AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U'
        searchUrl = url + location + radius + type + key
        response = requests.get(searchUrl).json()
        return Response(response)


    