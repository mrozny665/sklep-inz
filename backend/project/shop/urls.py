"""
URL configuration for shop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from shop1 import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductView, 'products')
router.register(r'bills', views.BillView, 'bills')
router.register(r'sales', views.SaleView, 'sales')
router.register(r'supplies', views.SupplyView, 'supplies')
router.register(r'employees', views.EmployeeView, 'employees')
router.register(r'productsupplies', views.ProductSupplyView, 'productsupplies')

urlpatterns = [
    path('polls/', include('shop1.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', views.LoginView.as_view(), name='login'),
    path('api/hire/', views.HireView.as_view(), name='hire'),
]
