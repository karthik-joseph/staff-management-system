import datetime

from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse

from .models import Employee, Department, Role


def view_employee(request):
    """
    View function to display all employees.
    Ensures fresh data is fetched sfrom the database on each request.
    """
    # Always fetch fresh data from the database
    employees = Employee.objects.all()
    
    context = {
        'employees': employees,
        'departments': Department.objects.all(),
        'roles': Role.objects.all(),
        # Added timestamp to prevent browser caching
        'timestamp': datetime.datetime.now().timestamp(),
    }
    
    # Add cache control headers to prevent browser caching
    response = render(request, 'view_employees.html', context)
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    
    return response

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
            })
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method'
    })

def delete_employee(request):
    """
    View function to handle employee deletion.
    POST: Processes the deletion request for a specific employee.
    """
    
    if request.method == 'POST':
        employee_id = request.POST.get('employee_id')
        try:
            # Try to get the employee directly - more efficient than checking first
            employee = Employee.objects.get(id=employee_id)
            employee_name = str(employee)  # Get employee name/info for the success message
            employee.delete()
            return JsonResponse({
                'success': True,
                'message': f"Employee {employee_name} Deleted successfully!",
            }, status=200)
        except Employee.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': "Employee Does Not Exists!"
            }, status=404)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=500)
    
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method'
    }, status=405)