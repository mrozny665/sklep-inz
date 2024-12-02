import datetime

from django.test import TestCase

from shop1.models import Product, Employee, Bill


# Create your tests here.

class ShopTestCase(TestCase):
    def setUp(self):
        Product.objects.create(product_name='Product 1', unit="1L", count=5, price_no_vat=5.0, price_with_vat=5.0,
                               vat=0)
        Product.objects.create(product_name='Product 2', unit="200g", count=4, price_no_vat=5.0, price_with_vat=6.15,
                               vat=23)
        Employee.objects.create(employee_name='Employee 1', is_active=True, is_manager=True)
        Employee.objects.create(employee_name='Employee 2', is_active=True, is_manager=False)
        Bill.objects.create(issue_date=datetime.date(2024, 11, 30), products_count=2, price_no_vat=5.0,
                            price_with_vat=5.0, employee_id=Employee.objects.get(employee_name='Employee 1'))
        Bill.objects.create(issue_date=datetime.date(2024, 12, 1), products_count=5, price_no_vat=31.0,
                            price_with_vat=37.0, employee_id=Employee.objects.get(employee_name='Employee 2'))
        Bill.objects.create(issue_date=datetime.date(2024, 12, 2), products_count=1, price_no_vat=1.5,
                            price_with_vat=2.1, employee_id=Employee.objects.get(employee_name='Employee 1'))

    def test_add_products(self):
        products = Product.objects.all()
        self.assertEqual(products.count(), 2)
        self.assertEqual(products[0].product_name, 'Product 1')
        self.assertEqual(products[1].product_name, 'Product 2')

    def test_add_employees(self):
        employees = Employee.objects.all()
        self.assertEqual(employees.count(), 2)
        self.assertEqual(employees[0].employee_name, 'Employee 1')
        self.assertEqual(employees[1].employee_name, 'Employee 2')
        self.assertTrue(employees[0].is_active)
        self.assertTrue(employees[1].is_active)
        a = Employee.objects.get(employee_name='Employee 2')
        a.is_active = False
        a.save()
        self.assertFalse(employees[1].is_active)

    def test_add_employees_fail(self):
        employees = Employee.objects.all()
        self.assertEqual(employees.count(), 2)
        self.assertEqual(employees[0].employee_name, 'Employee 1')
        self.assertEqual(employees[1].employee_name, 'Employee 2')
        self.assertTrue(employees[0].is_active)
        self.assertTrue(employees[1].is_active)
        a = Employee.objects.get(employee_name='Employee 2')
        a.is_active = False
        a.save()
        self.assertTrue(employees[1].is_active)

    def test_get_bills(self):
        bills = Bill.objects.filter(employee_id=Employee.objects.get(employee_name='Employee 1'))
        self.assertEqual(bills.count(), 2)
