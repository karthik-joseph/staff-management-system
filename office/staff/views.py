import datetime

from django.shortcuts import render
from django.db.models import Q

from .models import Employee, Department, Role




def index(request):
    employees = Employee.objects.all()
    context = {'employees': employees}  
    return render(request, 'index.html', context)

def view_employee(request):
    """
    View function to display all employees.
    Ensures fresh data is fetched from the database on each request.
    """
    # Always fetch fresh data from the database
    employees = Employee.objects.all()
    
    context = {
        'employees': employees,
        # Add timestamp to prevent browser caching
        'timestamp': datetime.datetime.now().timestamp(),
    }
    
    # Add cache control headers to prevent browser caching
    response = render(request, 'view_employees.html', context)
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    
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

def filter_employee(request):
    """
    View function to filter employees based on name, department, and role.
    """
    # Initialize with all employees
    filtered_employees = Employee.objects.all()
    context = {}
    
    if request.method == 'GET' and request.GET:
        # Get filter parameters
        name = request.GET.get('name', '').strip()
        department = request.GET.get('dept', '').strip()
        role = request.GET.get('role', '').strip()
        
        # Apply filters if provided
        if name:
            # For name, check both first_name and last_name
            filtered_employees = filtered_employees.filter(
                Q(first_name__icontains=name) | Q(last_name__icontains=name)
            )
        
        if department:
            # Department is a foreign key named 'dept', and has 'dept_name' field in Department model
            filtered_employees = filtered_employees.filter(
                dept__dept_name__icontains=department
            )
        
        if role:
            # Role is a foreign key, and has 'role_name' field in Role model
            filtered_employees = filtered_employees.filter(
                role__role_name__icontains=role
            )
            
        context['filter_applied'] = True
        context['filtered_employees'] = filtered_employees
    
    # Always include departments and roles in context for dropdown menus
    context['departments'] = Department.objects.all()
    context['roles'] = Role.objects.all()
    context['employees'] = filtered_employees
    
    return render(request, 'filter_employees.html', context)
