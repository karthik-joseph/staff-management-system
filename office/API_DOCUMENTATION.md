# Staff Management System API Documentation

## Overview

This document provides detailed information about the Staff Management System API endpoints, their usage, and expected responses.

## Base URL

All API endpoints are relative to the base URL: `/staff/`

## Authentication

Currently, the API does not require authentication. However, it is recommended to implement proper authentication in production.

## Endpoints

### 1. View Employees

Retrieves a list of all employees in the system.

**Endpoint:** `GET /view-employees/`

**Response:**

```json
{
    "employees": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "+1234567890",
            "salary": 50000,
            "bonus": 5000,
            "dept": "IT",
            "role": "Developer",
            "date_hire": "2024-01-01T00:00:00Z"
        }
    ],
    "departments": [...],
    "roles": [...],
    "timestamp": 1234567890
}
```

### 2. Add Employee

Creates a new employee in the system.

**Endpoint:** `POST /add-employee/`

**Request Body:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "salary": 50000,
  "bonus": 5000,
  "dept": 1,
  "role": 1,
  "date_hire": "2024-01-01"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Employee added successfully!",
  "employee": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "salary": 50000,
    "bonus": 5000,
    "dept": "IT",
    "role": "Developer",
    "date_hire": "2024-01-01"
  }
}
```

### 3. Update Employee

Updates an existing employee's information.

**Endpoint:** `POST /update-employee/`

**Request Body:**

```json
{
  "employee_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "salary": 55000,
  "bonus": 6000,
  "dept": 1,
  "role": 1,
  "date_hire": "2024-01-01"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Employee John Doe updated successfully!",
  "employee": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "salary": 55000,
    "bonus": 6000,
    "dept": "IT",
    "role": "Developer",
    "date_hire": "2024-01-01"
  }
}
```

### 4. Delete Employee

Deletes an employee from the system.

**Endpoint:** `POST /delete-employee/`

**Request Body:**

```json
{
  "employee_id": 1
}
```

**Response:**

```json
{
  "success": true,
  "message": "Employee John Doe Deleted successfully!"
}
```

## Error Responses

All endpoints may return the following error responses:

### 404 Not Found

```json
{
  "success": false,
  "message": "Employee not found!"
}
```

### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid request method"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Error message details"
}
```

## Field Validations

### Employee Fields

- `first_name`: Required, max length 100 characters
- `last_name`: Required, max length 100 characters
- `email`: Required, valid email format, must be unique
- `phone`: Required, must match format '+999999999' (9-15 digits)
- `salary`: Required, must be non-negative
- `bonus`: Required, must be non-negative
- `dept`: Required, must be a valid department ID
- `role`: Required, must be a valid role ID
- `date_hire`: Required, valid datetime format

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting in production.

## CORS

Currently, CORS is not configured. Consider implementing proper CORS configuration in production.

## Security Considerations

1. Implement proper authentication
2. Use HTTPS in production
3. Implement rate limiting
4. Add input validation
5. Implement proper error handling
6. Add logging
7. Implement proper session management

## Future Improvements

1. Add pagination for employee list
2. Implement search functionality
3. Add sorting capabilities
4. Implement filtering
5. Add bulk operations
6. Implement caching
7. Add API versioning
8. Implement proper authentication
9. Add request/response logging
10. Implement proper error tracking
