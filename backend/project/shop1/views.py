from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets

from shop1.models import Product
from shop1.serializers import ProductSerializer

from shop1.models import Bill
from shop1.serializers import BillSerializer

from shop1.models import Sale
from shop1.serializers import SaleSerializer

from shop1.models import Supply
from shop1.serializers import SupplySerializer

from shop1.models import Employee
from shop1.serializers import EmployeeSerializer


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class BillView(viewsets.ModelViewSet):
    serializer_class = BillSerializer
    queryset = Bill.objects.all()


class SaleView(viewsets.ModelViewSet):
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()


class SupplyView(viewsets.ModelViewSet):
    serializer_class = SupplySerializer
    queryset = Supply.objects.all()


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
