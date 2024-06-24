from django.db.models import QuerySet, Sum
from .utils import custom_server_error_response, custom_success_response, custom_user_error_response
from users.models import User
from .models import Transaction
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import SavingPlanSerializer, WalletSerializer, TransactionSerializer
from datetime import date
from .models import CustomLabel
from .serializers import LabelSerializer



class WalletAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = WalletSerializer

    def get(self, request):
        user: User = request.user

        wallet = user.get_wallet()
        wallet_serialized = WalletSerializer(wallet)
        return Response(wallet_serialized.data)

    def put(self, request):
        user: User = request.user
        wallet = user.get_wallet()

        try:
            value = float(request.data)
        except (ValueError, TypeError):
            return custom_user_error_response("Entered value needs to be a number. Please try again.", 422)

        wallet.set_balance(value)

        return custom_success_response("Wallet's balance successfully updated!")


class TransactionAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TransactionSerializer

    def post(self, request):
        user: User = request.user

        data = request.data
        transaction = Transaction.create_from_json(data, user_pk=user.pk)

        # TODO: Change response to message string
        return custom_success_response("Transaction created with success!")

    def delete(self, request, transaction_pk):
        user: User = request.user

        if not transaction_pk:
            return custom_server_error_response("No transaction id was given. Please try again.")

        transaction = Transaction.objects.get(pk=transaction_pk)

        # Transaction does not belong to the requesting user
        if not transaction.is_from_wallet(user.get_wallet()):
            raise PermissionError()

        transaction.delete()

        return custom_success_response("Transaction deleted with success!")


class LabelAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LabelSerializer

    def get(self, request):
        user: User = request.user

        labels = user.get_labels()
        serializer = self.serializer_class(labels, many=True)

        return Response(serializer.data)

    def post(self, request):
        user: User = request.user

        data = request.data
        CustomLabel.create_from_json(data, user_pk=user.pk)

        return custom_success_response("Label created with success!")

    def delete(self, request, label_pk):
        user: User = request.user

        if not label_pk:
            return custom_server_error_response("No label id was given. Please try again.")

        label = CustomLabel.objects.get(pk=label_pk)

        # Transaction does not belong to the requesting user
        if not label.is_from_wallet(user.get_wallet()):
            raise PermissionError()

        label.delete()

        return custom_success_response("Label deleted with success!")
    
    def put(self, request, label_pk):
        user: User = request.user

        if not label_pk:
            return custom_server_error_response("No label id was given. Please try again.")

        try:
            label = CustomLabel.objects.get(pk=label_pk)
        except CustomLabel.DoesNotExist:
            return custom_server_error_response("Label not found.")

        # Check if the label belongs to the user's wallet
        if not label.is_from_wallet(user.get_wallet()):
            raise PermissionError()

        serializer = self.serializer_class(label, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return custom_success_response("Label updated with success!")
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/register',
        '/api/wallet',
        '/api/savingplans',
        '/api/transactions',
        '/api/transaction',
        '/api/labels',
    ]

    return Response(routes)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_user(request):
    data = request.data
    user = User.create_from_json(data)
    return Response("ok")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_saving_plans(request):
    user: User = request.user

    saving_plans = user.get_wallet().get_saving_plans()
    saving_plans_serialized = SavingPlanSerializer(saving_plans, many=True)

    return Response(saving_plans_serialized.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transactions(request):
    user: User = request.user
    transactions: QuerySet

    start_date_str = request.query_params.get('start_date')
    end_date_str = request.query_params.get('end_date')
    # number of transactions returned
    limit = request.query_params.get('limit')
    # return only values grouped by date for charts
    chart_type = request.query_params.get('chart_type')

    transactions = user.get_wallet().get_transactions().order_by('-id')

    if start_date_str and end_date_str:
        start_date = date.fromisoformat(start_date_str)
        end_date = date.fromisoformat(end_date_str)
        print("sorted")

        transactions = transactions.get_in_range(start_date, end_date)
        print(transactions)

    if limit and int(limit) > 0:
        transactions = transactions[:int(limit)]

    if int(chart_type) == 0:
        transactions_serialized = TransactionSerializer(transactions, many=True)
        return Response(transactions_serialized.data)

    if int(chart_type) == 1:
        # CHART TYPE == 1: Bar chart grouping by dates
        grouped_transactions_list = transactions.expenses().group_by_dates().add_empty_dates(start_date, end_date)
        print(grouped_transactions_list)
        print("get bar info")

    elif int(chart_type) == 2:
        # CHART TYPE == 2: Pie chart grouping by labels
        grouped_transactions_list = transactions.expenses().group_by_labels()
        print("get pie info")


    return Response(grouped_transactions_list)