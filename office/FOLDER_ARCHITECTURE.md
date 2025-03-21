# Staff Management System - Folder Architecture

## Project Structure

```
staff-management-system/
├── office/                      # Main project directory
│   ├── manage.py               # Django management script
│   ├── db.sqlite3              # SQLite database file
│   ├── .gitignore              # Git ignore file
│   ├── office/                 # Project configuration directory
│   │   ├── __init__.py
│   │   ├── settings.py         # Project settings
│   │   ├── urls.py             # Main URL configuration
│   │   ├── asgi.py             # ASGI configuration
│   │   └── wsgi.py             # WSGI configuration
│   │
│   └── staff/                  # Main application directory
│       ├── __init__.py
│       ├── admin.py            # Admin interface configuration
│       ├── apps.py             # Application configuration
│       ├── models.py           # Database models
│       ├── views.py            # View functions
│       ├── urls.py             # Application URL configuration
│       ├── API_DOCUMENTATION.md # API documentation
│       ├── SYSTEM_ARCHITECTURE.md # System architecture documentation
│       ├── PROJECT_REPORT.md   # Project report
│       ├── FOLDER_ARCHITECTURE.md # This file
│       │
│       ├── migrations/         # Database migrations
│       │   ├── __init__.py
│       │   └── 0001_initial.py # Initial migration
│       │
│       ├── static/            # Static files
│       │   └── css/
│       │       └── index-new.css
│       │
│       └── templates/         # HTML templates
│           ├── base.html      # Base template
│           └── view_employees.html # Main view template
│
├── venv/                      # Virtual environment directory
│   ├── Lib/
│   ├── Scripts/
│   └── pyvenv.cfg
│
└── .git/                      # Git repository directory
```

## Directory Descriptions

### 1. Root Directory (`staff-management-system/`)

- Contains the entire project structure
- Houses the main project directory and virtual environment

### 2. Main Project Directory (`office/`)

- Contains Django project configuration and application code
- Houses the database file and management scripts

#### Key Files:

- `manage.py`: Django's command-line utility for administrative tasks
- `db.sqlite3`: SQLite database file
- `.gitignore`: Specifies which files Git should ignore

### 3. Project Configuration (`office/office/`)

- Contains project-level settings and configurations

#### Key Files:

- `settings.py`: Project settings and configurations
- `urls.py`: Main URL routing configuration
- `wsgi.py`: WSGI application configuration
- `asgi.py`: ASGI application configuration

### 4. Main Application (`office/staff/`)

- Contains the core application code

#### Key Files:

- `models.py`: Database models and relationships
- `views.py`: View functions and logic
- `urls.py`: Application URL routing
- `admin.py`: Admin interface configuration
- `apps.py`: Application configuration

#### Documentation Files:

- `API_DOCUMENTATION.md`: API documentation
- `SYSTEM_ARCHITECTURE.md`: System architecture documentation
- `PROJECT_REPORT.md`: Project report
- `FOLDER_ARCHITECTURE.md`: This file

### 5. Migrations (`office/staff/migrations/`)

- Contains database migration files
- Tracks database schema changes

### 6. Static Files (`office/staff/static/`)

- Contains static assets
- CSS files for styling

### 7. Templates (`office/staff/templates/`)

- Contains HTML templates
- Base template and view-specific templates

### 8. Virtual Environment (`venv/`)

- Contains Python virtual environment
- Houses project dependencies

### 9. Git Repository (`.git/`)

- Contains Git version control information
- Tracks code changes and history

## File Purposes

### Configuration Files

- `settings.py`: Project settings, database configuration, installed apps
- `urls.py`: URL routing and endpoint definitions
- `wsgi.py`: Web Server Gateway Interface configuration
- `asgi.py`: Asynchronous Server Gateway Interface configuration

### Application Files

- `models.py`: Database models (Department, Role, Employee)
- `views.py`: View functions for CRUD operations
- `admin.py`: Admin interface customization
- `apps.py`: Application configuration and metadata

### Template Files

- `base.html`: Base template with common layout
- `view_employees.html`: Main employee management interface

### Static Files

- `index-new.css`: Main stylesheet for the application

### Documentation Files

- `API_DOCUMENTATION.md`: API endpoints and usage
- `SYSTEM_ARCHITECTURE.md`: System design and components
- `PROJECT_REPORT.md`: Project overview and details
- `FOLDER_ARCHITECTURE.md`: This file

## Development Guidelines

### 1. File Organization

- Keep related files together
- Follow Django's recommended project structure
- Maintain clear separation of concerns

### 2. Naming Conventions

- Use lowercase for file names
- Use underscores for spaces
- Follow Python naming conventions

### 3. Code Organization

- Group related functionality
- Keep files focused and single-purpose
- Maintain clear file structure

### 4. Documentation

- Keep documentation up to date
- Document major changes
- Include setup instructions

## Deployment Considerations

### 1. Production Structure

```
production/
├── nginx/              # Nginx configuration
├── gunicorn/          # Gunicorn configuration
├── static/            # Collected static files
├── media/             # User-uploaded files
└── logs/              # Application logs
```

### 2. Environment Files

- `.env`: Environment variables
- `requirements.txt`: Project dependencies
- `Procfile`: Deployment configuration

### 3. Security Files

- `security.py`: Security configurations
- `ssl/`: SSL certificates
- `firewall/`: Firewall rules
