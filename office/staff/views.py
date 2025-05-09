import datetime
from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse, Http404
from django.core.paginator import Paginator

from .models import Employee, Department, Role


def view_employee(request):
    """
    View function to display all employees with pagination.
    """
    try:
        # Get all employees
        employees_list = Employee.objects.all()
        
        # Pagination
        paginator = Paginator(employees_list, 10)  # Show 10 employees per page
        page = request.GET.get('page')
        employees = paginator.get_page(page)
        
        context = {
            'employees': employees,
            'departments': Department.objects.all(),
            'roles': Role.objects.all(),
            'timestamp': datetime.datetime.now().timestamp(),
        }
        
        return render(request, 'view_employees.html', context)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=500)

def add_employee(request):
    if request.method == 'POST':
        try:
            employee = Employee()
            employee.first_name = request.POST['first_name']
            employee.last_name = request.POST['last_name']
            employee.email = request.POST['email']
            employee.phone = request.POST['phone']
            employee.salary = request.POST['salary']
            employee.bonus = request.POST['bonus']
            employee.dept = Department.objects.get(id=request.POST['dept'])
            employee.role = Role.objects.get(id=request.POST['role'])
            employee.date_hire = request.POST['date_hire']
            employee.save()
            return JsonResponse({
                'success': True,
                'message': 'Employee added successfully!',
                'employee': {
                    'id': employee.id,
                    'first_name': employee.first_name,
                    'last_name': employee.last_name,
                    'email': employee.email,
                    'phone': employee.phone,
                    'salary': employee.salary,
                    'bonus': employee.bonus,
                    'dept': employee.dept.dept_name,
                    'role': employee.role.role_name,
                    'date_hire': employee.date_hire
                }
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=400)
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method'
    }, status=405)

def delete_employee(request):
    """
    View function to handle employee deletion.
    POST: Processes the deletion request for a specific employee.
    """
    if request.method == 'POST':
        try:
            employee_id = request.POST.get('employee_id')
            if not employee_id:
                raise ValueError("Employee ID is required")
                
            employee = Employee.objects.get(id=employee_id)
            employee_name = str(employee)
            employee.delete()
            
            return JsonResponse({
                'success': True,
                'message': f"Employee {employee_name} deleted successfully!"
            })
        except Employee.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': "Employee not found!"
            }, status=404)
        except ValueError as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=500)
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method'
    }, status=405)

def update_employee(request):
    """
    View function to handle employee updates.
    POST: Processes the update request for a specific employee.
    """
    if request.method == 'POST':
        try:
            employee_id = request.POST.get('employee_id')
            if not employee_id:
                raise ValueError("Employee ID is required")
                
            employee = Employee.objects.get(id=employee_id)
            
            # Update employee fields
            employee.first_name = request.POST['first_name']
            employee.last_name = request.POST['last_name']
            employee.email = request.POST['email']
            employee.phone = request.POST['phone']
            employee.salary = request.POST['salary']
            employee.bonus = request.POST['bonus']
            employee.dept = Department.objects.get(id=request.POST['dept'])
            employee.role = Role.objects.get(id=request.POST['role'])
            employee.date_hire = request.POST['date_hire']
            
            employee.save()
            
            return JsonResponse({
                'success': True,
                'message': f'Employee {employee.first_name} {employee.last_name} updated successfully!',
                'employee': {
                    'id': employee.id,
                    'first_name': employee.first_name,
                    'last_name': employee.last_name,
                    'email': employee.email,
                    'phone': employee.phone,
                    'salary': employee.salary,
                    'bonus': employee.bonus,
                    'dept': employee.dept.dept_name,
                    'role': employee.role.role_name,
                    'date_hire': employee.date_hire
                }
            })
        except Employee.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Employee not found!'
            }, status=404)
        except ValueError as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=500)
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method'
    }, status=405)

def page_not_found(request, exception=None):
    """
    Custom 404 page handler
    """
    return render(request, '404.html', status=404)

def handler404(request, *args, **kwargs):
    """
    Global 404 handler
    """
    return page_not_found(request, None)

