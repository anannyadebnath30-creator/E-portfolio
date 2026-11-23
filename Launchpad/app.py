"""Launchpad Career Portal: Flask + MySQL account authentication demo."""
import os
import re
from datetime import timedelta

import mysql.connector
from mysql.connector import IntegrityError, Error as MySQLError
from flask import Flask, jsonify, request, send_from_directory, session
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=os.path.join(BASE_DIR, 'assets'), static_url_path='/assets')
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'change-this-development-secret-before-deployment')
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_SECURE=os.environ.get('COOKIE_SECURE', '0') == '1',
    PERMANENT_SESSION_LIFETIME=timedelta(hours=8),
)

DB_CONFIG = {
    'host': os.environ.get('DB_HOST', '127.0.0.1'),
    'port': int(os.environ.get('DB_PORT', '3306')),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD', ''),
    'database': os.environ.get('DB_NAME', 'launchpad_db'),
    'connection_timeout': 5,
}
EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')


def get_db_connection():
    """Connect to the schema selected in MySQL Workbench and ensure accounts table exists."""
    connection = mysql.connector.connect(**DB_CONFIG)
    cursor = None
    try:
        cursor = connection.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(254) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('student', 'company') NOT NULL,
                education VARCHAR(180) NOT NULL DEFAULT '',
                graduation_year VARCHAR(4) NOT NULL DEFAULT '',
                about TEXT NOT NULL,
                skills VARCHAR(500) NOT NULL DEFAULT '',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        """)
        # Add profile fields to databases created by earlier versions of Launchpad.
        cursor.execute("SHOW COLUMNS FROM users LIKE 'education'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN education VARCHAR(180) NOT NULL DEFAULT ''")
        cursor.execute("SHOW COLUMNS FROM users LIKE 'graduation_year'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN graduation_year VARCHAR(4) NOT NULL DEFAULT ''")
        cursor.execute("SHOW COLUMNS FROM users LIKE 'about'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN about TEXT NOT NULL")
        cursor.execute("SHOW COLUMNS FROM users LIKE 'skills'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN skills VARCHAR(500) NOT NULL DEFAULT ''")
        connection.commit()
    except Exception:
        connection.close()
        raise
    finally:
        if cursor:
            cursor.close()
    return connection


def api_error(message, status=400):
    return jsonify({'error': message}), status


def clean_text(value):
    return value.strip() if isinstance(value, str) else ''


@app.get('/')
@app.get('/index.html')
def home():
    # Both the site root and the legacy index.html link show the public home page.
    return send_from_directory(BASE_DIR, 'index.html')


@app.get('/pages/<path:filename>')
def pages(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'pages'), filename)


@app.after_request
def prevent_stale_frontend_cache(response):
    # Ensure the latest navigation JavaScript is loaded while developing locally.
    if request.path == '/' or request.path.endswith(('.html', '.js', '.css')):
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    return response


@app.get('/health')
def health():
    return jsonify({'ok': True, 'service': 'Launchpad'}), 200


@app.post('/api/signup')
def signup():
    data = request.get_json(silent=True) or {}
    name = clean_text(data.get('name'))
    email = clean_text(data.get('email')).lower()
    password = data.get('password') if isinstance(data.get('password'), str) else ''
    role = clean_text(data.get('role')).lower()

    if role not in ('student', 'company'):
        return api_error('Choose a valid account type.', 400)
    if len(name) < 2 or len(name) > 120:
        return api_error('Please enter a name with at least 2 characters.', 400)
    if not EMAIL_RE.match(email) or len(email) > 254:
        return api_error('Please enter a valid email address.', 400)
    if len(password) < 8:
        return api_error('Your password must contain at least 8 characters.', 400)
    if len(password) > 128:
        return api_error('Please choose a password of 128 characters or fewer.', 400)

    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        password_hash = generate_password_hash(password)
        cursor.execute(
            'INSERT INTO users (name, email, password_hash, role) VALUES (%s, %s, %s, %s)',
            (name, email, password_hash, role),
        )
        connection.commit()
        user_id = cursor.lastrowid
        session.clear()
        session.permanent = True
        session['user_id'] = user_id
        session['name'] = name
        session['role'] = role
        redirect = '/pages/company-dashboard.html' if role == 'company' else '/' 
        return jsonify({'message': 'Account created successfully. You are now logged in.', 'redirect': redirect}), 201
    except IntegrityError:
        if connection:
            connection.rollback()
        return api_error('An account with this email already exists. Please log in instead.', 409)
    except MySQLError as exc:
        app.logger.error('Database error during signup: %s', exc)
        if connection:
            connection.rollback()
        return api_error('Database connection failed. Check that MySQL Server is running, the launchpad_db schema exists, and your DB settings are correct.', 503)
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


@app.post('/api/login')
def login():
    data = request.get_json(silent=True) or {}
    email = clean_text(data.get('email')).lower()
    password = data.get('password') if isinstance(data.get('password'), str) else ''
    role = clean_text(data.get('role')).lower()
    if role not in ('student', 'company'):
        return api_error('Choose a valid account type.', 400)
    if not email or not password:
        return api_error('Enter your email and password.', 400)

    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute('SELECT id, name, email, password_hash, role FROM users WHERE email = %s LIMIT 1', (email,))
        user = cursor.fetchone()
    except MySQLError as exc:
        app.logger.error('Database error during login: %s', exc)
        return api_error('Database connection failed. Check that MySQL Server is running, the launchpad_db schema exists, and your DB settings are correct.', 503)
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

    if not user or not check_password_hash(user['password_hash'], password):
        return api_error('Incorrect email or password.', 401)
    if user['role'] != role:
        return api_error(f'This email is registered as a {user["role"]} account. Use the matching login page.', 403)

    session.clear()
    session.permanent = True
    session['user_id'] = user['id']
    session['name'] = user['name']
    session['role'] = user['role']
    redirect = '/pages/company-dashboard.html' if role == 'company' else '/' 
    return jsonify({'message': 'Login successful.', 'redirect': redirect})


@app.get('/api/me')
def me():
    if not session.get('user_id'):
        return jsonify({'authenticated': False})
    return jsonify({
        'authenticated': True,
        'user': {'id': session['user_id'], 'name': session.get('name', ''), 'role': session.get('role', '')},
    })


@app.get('/api/profile')
def get_profile():
    if not session.get('user_id'):
        return api_error('Please log in to view your profile.', 401)
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, name, email, role, education, graduation_year, about, skills FROM users WHERE id = %s LIMIT 1", (session['user_id'],))
        user = cursor.fetchone()
        if not user:
            session.clear()
            return api_error('Your account could not be found. Please log in again.', 401)
        return jsonify({'profile': user})
    except MySQLError as exc:
        app.logger.error('Database error loading profile: %s', exc)
        return api_error('Could not load your profile from MySQL. Check your database connection.', 503)
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


@app.put('/api/profile')
def update_profile():
    if not session.get('user_id'):
        return api_error('Please log in before saving your profile.', 401)
    data = request.get_json(silent=True) or {}
    name = clean_text(data.get('name'))
    education = clean_text(data.get('education'))
    graduation_year = clean_text(str(data.get('graduation_year', '')))
    about = clean_text(data.get('about'))
    skills = clean_text(data.get('skills'))
    if len(name) < 2 or len(name) > 120:
        return api_error('Please enter a name between 2 and 120 characters.')
    if len(education) > 180 or len(about) > 2000 or len(skills) > 500:
        return api_error('Please shorten your education, about, or skills information.')
    if graduation_year and (not graduation_year.isdigit() or len(graduation_year) != 4):
        return api_error('Please enter a valid four-digit graduation year.')
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute('UPDATE users SET name = %s, education = %s, graduation_year = %s, about = %s, skills = %s WHERE id = %s', (name, education, graduation_year, about, skills, session['user_id']))
        connection.commit()
        cursor.execute('SELECT id, name, email, role, education, graduation_year, about, skills FROM users WHERE id = %s LIMIT 1', (session['user_id'],))
        user = cursor.fetchone()
        session['name'] = name
        return jsonify({'message': 'Profile updated and saved successfully.', 'profile': user})
    except MySQLError as exc:
        app.logger.error('Database error saving profile: %s', exc)
        if connection:
            connection.rollback()
        return api_error('Could not save your profile to MySQL. Check your database connection.', 503)
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


@app.post('/api/logout')
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully.'})


if __name__ == '__main__':
    # Local development only. Do not use Flask's development server for public deployment.
    app.run(host='127.0.0.1', port=5000, debug=True)
