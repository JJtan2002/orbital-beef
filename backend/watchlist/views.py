from django.db.models import QuerySet, Sum
from users.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import WatchlistSerializer
from datetime import date

class WatchlistAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = WatchlistSerializer

    def get(self, request):
        user: User = request.user
        watchlists = user.get_watchlist()

        serializer = self.serializer_class(watchlists, many=True)
        return Response(serializer.data)

    def post(self, request):
        user: User = request.user

        data = request.data
        Watchlist.create_from_json(data, user_pk=user.pk)

        return custom_success_response("Ticker added with success!")
    
    def delete(self, request, watchlist_pk):
        user: User = request.user

        if not watchlist_pk:
            return custom_server_error_response("No watchlist id was given. Please try again.")

        watchlist = Watchlist.objects.get(pk=watchlist_pk)

        watchlist.delete()
        return custom_success_response("Ticker deleted with success!")