# Launchpad – Career Portal

Launchpad is a student-focused career portal prototype designed to help students explore jobs and internships, understand skills they need to build, and manage their career profile. Companies can use the portal's company-side pages to create and manage job listings and review applications.

This project was built as an academic web development project using HTML, CSS, JavaScript, Flask, and MySQL.

## Features

- Responsive career portal homepage
- Job and internship listing pages
- Job detail pages
- Student and company sign-up / login flows
- Session-aware homepage navigation (shows the signed-in user)
- Student profile view and profile update flow
- Skills and learning / skill-gap pages
- Student application page
- Company dashboard and job-management pages
- MySQL-backed account registration and login
- Password hashing using Werkzeug

> **Project status:** Academic prototype. Authentication and profile data use MySQL. Job listings, applications, and company job-management functionality currently use sample/demo data and are not a complete production workflow.


## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Python, Flask
- **Database:** MySQL
- **Authentication:** Flask sessions + Werkzeug password hashing

## Project Structure

```text
Launchpad/
├── app.py
├── index.html
├── requirements.txt
├── .env.example
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       ├── data.js
│       └── home-auth.js
└── pages/
    ├── jobs.html
    ├── internships.html
    ├── job-detail.html
    ├── student-login.html
    ├── student-signup.html
    ├── student-access.html
    ├── student-details.html
    ├── profile.html
    ├── applications.html
    ├── skill-gap.html
    ├── learning.html
    ├── company-login.html
    ├── company-signup.html
    ├── company-access.html
    ├── company-dashboard.html
    ├── post-job.html
    ├── manage-jobs.html
    └── company-applications.html
```


## Run Locally


### 1. Prerequisites

- Python 3.10 or newer
- MySQL Server
- MySQL Workbench (optional client for database management)

### 2. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/launchpad-career-portal.git
cd launchpad-career-portal
```

### 3. Create and activate a virtual environment (Windows PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 5. Create the MySQL database

In MySQL Workbench, create a schema named:


```sql
CREATE DATABASE launchpad_db;
```

The app creates/updates its `users` table when it connects.

### 6. Configure environment variables

Copy `.env.example` as a reference and set the environment variables in your terminal. Do **not** commit your real database password or secret key.

Example (PowerShell):

```powershell
$env:DB_HOST="127.0.0.1"
$env:DB_PORT="3306"
$env:DB_USER="root"
$env:DB_PASSWORD="your_mysql_password"
$env:DB_NAME="launchpad_db"
$env:FLASK_SECRET_KEY="replace-with-a-long-random-secret"
```

If your local MySQL account has no password, set `DB_PASSWORD` to an empty string.

### 7. Start Flask

```bash
python app.py
```

Open this URL in your browser:

**http://127.0.0.1:5000/**

Use the Flask server (not Live Server or a directly opened HTML file) to test account registration, login, sessions, and profile saving.

## Security Notes

- Never commit `.env` files, actual passwords, API keys, or private credentials.
- Use a strong, unique `FLASK_SECRET_KEY` outside local testing.
- The app is a learning prototype and is not production-ready. Review security, validation, session settings, database permissions, and deployment configuration before exposing it publicly.


## Future Improvements

- Store job listings, applications, and company data in the database instead of sample data
- Add application tracking and status updates backed by MySQL
- Improve input validation and error handling
- Add production-ready security configuration and deployment
- Add tests and screenshots/demo documentation

## Contributors

Academic project. Add team member names here if your team wants to be credited publicly.


## License

No license has been added yet. Unless a license is included, the repository's code is not automatically open for reuse. Add a license if you want to specify reuse permissions.
