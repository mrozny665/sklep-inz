from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

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

from shop1.models import User
from shop1.serializers import UserSerializer

SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"
URL = "http://localhost:3000"


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


class RegistrationView(APIView):
    def post(self, request, format=None):
        request.data["password"] = make_password(
            password=request.data["password"], salt=SALT
        )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "You are now registered on our website!"},
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )


class LoginView(APIView):
    def post(self, request, format=None):
        login = request.data["login"]
        password = request.data["password"]
        hashed_password = make_password(password=password, salt=SALT)
        user = User.objects.filter(login=login).first()
        if user is None or user.password != hashed_password:
            return Response(
                {
                    "success": False,
                    "message": "Invalid Login Credentials!",
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"success": True, "message": "You are now logged in!"},
                status=status.HTTP_200_OK,
            )
