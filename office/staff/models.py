from django.db import models
from django.core.validators import MinValueValidator, RegexValidator
from django.core.exceptions import ValidationError
import re


class Department(models.Model):
    dept_name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'

    def __str__(self):
        return self.dept_name

class Role(models.Model):
    role_name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'

    def __str__(self):
        return self.role_name

class Employee(models.Model):
    first_name = models.CharField(max_length=100,blank=False, null=False)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100,blank=False, null=False, unique=True)
    salary = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0, message="Salary cannot be negative")]
    )
    dept = models.ForeignKey(Department, on_delete=models.CASCADE)
    bonus = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0, message="Bonus cannot be negative")]
    )
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    date_hire = models.DateTimeField()
    phone = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            )
        ]
    )

    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def clean(self):
        # Validate phone number format
        if not re.match(r'^\+?1?\d{9,15}$', self.phone):
            raise ValidationError({'phone': 'Invalid phone number format'})

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.first_name + ' ' + self.last_name