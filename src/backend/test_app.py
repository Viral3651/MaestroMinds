import pytest
import sqlite3
import json
from app import app, get_db_connection

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        # Set up a clean test database
        with get_db_connection() as conn:
            conn.execute('DROP TABLE IF EXISTS users')
            conn.execute('DROP TABLE IF EXISTS students')
            conn.execute('DROP TABLE IF EXISTS tutors')
            conn.execute('DROP TABLE IF EXISTS sessions')
            
            conn.execute('''CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password BLOB NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('student', 'tutor', 'both')),
                phone_number TEXT NOT NULL
            )''')

            conn.execute('''CREATE TABLE students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                grade_level TEXT,
                additional_notes TEXT,
                bio TEXT,
                interests TEXT,
                profile_picture BLOB,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )''')

            conn.execute('''CREATE TABLE tutors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                department TEXT NOT NULL,
                rating REAL,
                description TEXT,
                profile_picture BLOB,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )''')

            conn.execute('''CREATE TABLE sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                tutor_id INTEGER NOT NULL,
                scheduled_date TEXT NOT NULL,
                status TEXT NOT NULL,
                rating INTEGER,
                FOREIGN KEY (student_id) REFERENCES students (id),
                FOREIGN KEY (tutor_id) REFERENCES tutors (id)
            )''')
        yield client

def test_register_user(client):
    response = client.post('/api/register', json={
        'first_name': 'Jane',
        'last_name': 'Doe',
        'username': 'janedoe',
        'email': 'jane.doe@example.com',
        'password': 'password123',
        'phone_number': '1234567890'
    })
    assert response.status_code == 201
    assert b'User registered successfully' in response.data

def test_register_existing_user(client):
    client.post('/api/register', json={
        'first_name': 'Jane',
        'last_name': 'Doe',
        'username': 'janedoe',
        'email': 'jane.doe@example.com',
        'password': 'password123',
        'phone_number': '1234567890'
    })
    response = client.post('/api/register', json={
        'first_name': 'Jane',
        'last_name': 'Doe',
        'username': 'janedoe',
        'email': 'jane.doe@example.com',
        'password': 'password123',
        'phone_number': '1234567890'
    })
    assert response.status_code == 409
    assert b'Username or email already exists' in response.data

def test_login_success(client):
    client.post('/api/register', json={
        'first_name': 'Jane',
        'last_name': 'Doe',
        'username': 'janedoe',
        'email': 'jane.doe@example.com',
        'password': 'password123',
        'phone_number': '1234567890'
    })
    response = client.post('/api/login', json={
        'usernameOrEmail': 'janedoe',
        'password': 'password123'
    })
    assert response.status_code == 200
    assert b'Login successful' in response.data

def test_login_failure(client):
    response = client.post('/api/login', json={
        'usernameOrEmail': 'janedoe',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401
    assert b'Invalid credentials' in response.data

def test_tutor_registration(client):
    client.post('/api/register', json={
        'first_name': 'Jane',
        'last_name': 'Doe',
        'username': 'janedoe',
        'email': 'jane.doe@example.com',
        'password': 'password123',
        'phone_number': '1234567890'
    })
    response = client.post('/api/tutorregistration', json={
        'username': 'janedoe',
        'department': 'Mathematics'
    })
    assert response.status_code == 201
    assert b'Tutor registered successfully' in response.data
