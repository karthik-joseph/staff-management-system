from django.db import models


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
    email = models.EmailField(max_length=100,blank=False, null=False)
    salary = models.IntegerField(default=0)
    dept = models.ForeignKey(Department, on_delete=models.CASCADE)
    bonus = models.IntegerField(default=0)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    date_hire = models.DateTimeField()
    phone = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'


    def __str__(self):
        return self.first_name + ' ' + self.last_name