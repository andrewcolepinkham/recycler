# from submissions.models import Place
from rest_framework import viewsets
from rest_framework.response import Response
import requests

class PlacesAPI(viewsets.ViewSet):
    # serializer_class = PlacesSerializer

    def list(self, request):
        # print(self.request.data)
        # lat = 38.8598724
        # lng = -104.8230056
        # radius = '&radius=2000'
        # type = '&keyword=recycling'
        lat = self.request.data.lat
        lng = self.request.data.lng
        radius = '&radius=' + str(self.request.data.radius)
        search = '&keyword=' + str(self.request.data.keyword)
        location = 'location='+ str(lat) + ',' + str(lng)
        url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        key = '&key=AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U'
        searchUrl = url + location + radius + search + key
        response = requests.get(searchUrl).json()
        return Response(response)


    