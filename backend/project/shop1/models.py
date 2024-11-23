from django.db import models


class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)

    class Meta:
        db_table = 'tokens'


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    login = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = 'users'


# Create your models here.
class Supply(models.Model):
    supply_id = models.AutoField(primary_key=True)
    supply_date = models.DateField()
    product_id = models.ForeignKey('Product', models.DO_NOTHING, db_column='product_id')
    count = models.IntegerField()
    employee_id = models.ForeignKey('Employee', models.DO_NOTHING, db_column='employee_id')

    class Meta:
        db_table = 'supplies'


class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    bill_id = models.ForeignKey('Bill', models.DO_NOTHING, db_column='bill_id')
    nip_number = models.IntegerField()
    buyer_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'invoices'


class Bill(models.Model):
    bill_id = models.AutoField(primary_key=True)
    issue_date = models.DateField()
    products_count = models.IntegerField()
    price_no_vat = models.FloatField()
    price_with_vat = models.FloatField()
    employee_id = models.ForeignKey('Employee', models.DO_NOTHING, db_column='employee_id')

    class Meta:
        db_table = 'bills'


class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey('Product', models.DO_NOTHING, db_column='product_id')
    count = models.IntegerField()
    bill_id = models.ForeignKey(Bill, models.DO_NOTHING, db_column='bill_id')
    price_no_vat = models.FloatField()
    price_with_vat = models.FloatField()

    class Meta:
        db_table = 'sales'


class Product(models.Model):
    class Vat(models.IntegerChoices):
        ZERO = 0
        FIVE = 5
        EIGHT = 8
        TWENTY_THREE = 23
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(unique=True, max_length=255)
    unit = models.CharField(max_length=255)
    count = models.IntegerField()
    price_no_vat = models.FloatField()
    price_with_vat = models.FloatField()
    vat = models.IntegerField(choices=Vat.choices)

    def __str__(self):
        return self.product_name

    class Meta:
        db_table = 'products'


class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.CharField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_manager = models.BooleanField(default=False)

    class Meta:
        db_table = 'employees'


class Deletion(models.Model):
    deletion_id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey(Product, models.DO_NOTHING, db_column='product_id')
    count = models.IntegerField()
    deletion_date = models.DateField()
    employee_id = models.ForeignKey(Employee, models.DO_NOTHING, db_column='employee_id')

    class Meta:
        db_table = 'deletions'
