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
    # response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    # response['Pragma'] = 'no-cache'
    # response['Expires'] = '0'
    
    return response

def add_employee(request):
    context = {'departments': Department.objects.all(), 'roles': Role.objects.all()}
    if request.method == 'POST':
        print(request.POST)
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
        context['success_message'] = 'Employee added successfully'
        return render(request, 'add_employees.html', context)
    else:
        return render(request, 'add_employees.html', context)

def delete_employee(request):
    """
    View function to handle employee deletion.
    GET: Displays the deletion form with all employees.
    POST: Processes the deletion request for a specific employee.
    """
    context = {'employees': Employee.objects.all()}
    
    if request.method == 'POST':
        employee_id = request.POST.get('employee_id')
        
        try:
            # Try to get the employee directly - more efficient than checking first
            employee = Employee.objects.get(id=employee_id)
            employee_name = str(employee)  # Get employee name/info for the success message
            employee.delete()
            context['success_message'] = f'Employee {employee_name} deleted successfully'
        except Employee.DoesNotExist:
            # Handle the case when employee doesn't exist
            context['error_message'] = f'Employee with ID {employee_id} does not exist'
    
    return render(request, 'delete_employees.html', context)