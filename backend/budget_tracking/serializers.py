from rest_framework import serializers
from .models import Transaction, SavingPlan, Wallet, CustomLabel



class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomLabel
        fields = ('id', 'name', 'color', 'goal', 'current_amount', 'is_expense', 'is_monthly')


class WalletSerializer(serializers.ModelSerializer):
    monthly_earnings = serializers.DecimalField(max_digits=15, decimal_places=2, source='get_monthly_earnings', read_only=True)
    monthly_expenses = serializers.DecimalField(max_digits=15, decimal_places=2, source='get_monthly_expenses', read_only=True)
    labels = LabelSerializer(many=True)

    class Meta:
        model = Wallet
        fields = ('current_amount', 'monthly_earnings', 'monthly_expenses', 'labels')

    @staticmethod
    def get_monthly_earnings(obj):
        return obj.get_monthly_earnings()

    @staticmethod
    def get_monthly_expenses(obj):
        return obj.get_monthly_expenses()


class TransactionSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%m-%d-%Y", input_formats=['%m-%d-%Y'])
    value = serializers.DecimalField(decimal_places=2, max_digits=10)
    amount = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()
    label = LabelSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'value', 'date', 'type', 'title', 'label', 'recurrent', 'amount', 'duration', 'imported')

    @staticmethod
    def get_amount(obj):
        if obj.recurrent:
            return None
        return None

    @staticmethod
    def get_duration(obj):
        if obj.recurrent:
            return None
        return None


class SavingPlanSerializer(serializers.ModelSerializer):
    # days_to_end_goal = serializers.SerializerMethodField('get_days_to_end_goal')

    class Meta:
        model = SavingPlan
        fields = ('title', 'amount', 'active', 'goal_date', 'description')

    # def get_days_to_end_goal(self, obj):
    #     return (timezone.now() - obj.goal_date).days