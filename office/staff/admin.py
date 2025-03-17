from django.contrib import admin

# Register your models here.
from .models import Department, Role, Employee

class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'dept_name')
    search_fields = ('dept_name',)
    ordering = ('id',)
    list_per_page = 20

class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'role_name')
    search_fields = ('role_name',)
    ordering = ('id',)
    list_per_page = 20

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email')

    search_fields = ('first_name', 'last_name', 'email')
    ordering = ('id',)
    list_per_page = 20


admin.site.register(Department, DepartmentAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Employee, EmployeeAdmin)

