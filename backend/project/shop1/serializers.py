from rest_framework import serializers
from .models import Product, Bill, Sale, Supply, Employee


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

        
class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class SupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Supply
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
