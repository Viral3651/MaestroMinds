from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from bcrypt import hashpw, gensalt, checkpw

app = Flask(__name__)
CORS(app)
DATABASE = 'users.db'

# Helper function to connect to the database
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Endpoint to register a new user
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    username = data['username']
    email = data['email']
    password = data['password']
    role = 'student'
    phone_number = data['phone_number']

    # Hash the password
    hashed_password = hashpw(password.encode('utf-8'), gensalt())

    try:
        # Insert the new user into the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (first_name, last_name, username, email, password, role, phone_number) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (first_name, last_name, username, email, hashed_password, role, phone_number))
        user_id = cursor.lastrowid

        # Insert student-specific data into the students table
        if role == 'student':
            cursor.execute('''
                INSERT INTO students (user_id) 
                VALUES (?)
            ''', (user_id,))
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Username or email already exists'}), 409
    finally:
        conn.close()

    return jsonify({'message': 'User registered successfully'}), 201

# Endpoint to register a new tutor
@app.route('/api/tutorregistration', methods=['POST'])
def tutor_register():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    username = data['username']
    email = data['email']
    password = data['password']
    role = 'tutor'
    phone_number = data['phone_number']
    department = data['department']

    # Hash the password
    hashed_password = hashpw(password.encode('utf-8'), gensalt())

    try:
        # Insert the new user into the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO tutors (user_id, department)
            VALUES (?, ?)
        ''', (user_id, department))

        user_id = cursor.lastrowid

        # Insert tutor-specific data into the tutors table
        cursor.execute('''
            INSERT INTO tutors (user_id, department, available_times) 
            VALUES (?, ?, ?)
        ''', (user_id, department, available_times))
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Username or email already exists'}), 409
    finally:
        conn.close()

    return jsonify({'message': 'Tutor registered successfully'}), 201

# Endpoint to log in
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data['usernameOrEmail']
    password = data['password']

    # Fetch the user from the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM users WHERE username = ? OR email = ?
    ''', (username_or_email, username_or_email))
    user = cursor.fetchone()
    conn.close()

    if user and checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'message': 'Login successful', 'first_name': user['first_name'], 'last_name': user['last_name'], 'role': user['role']}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    # Create the necessary tables for users, students, tutors, and sessions
    with get_db_connection() as conn:
        # Users Table (common user attributes)
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password BLOB NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('student', 'tutor', 'both')),
                phone_number TEXT NOT NULL
            )
        ''')

        # Students Table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                grade_level TEXT,
                additional_notes TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')

        # Tutors Table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS tutors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                department TEXT NOT NULL,
                rating REAL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')

        # Sessions Table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                tutor_id INTEGER NOT NULL,
                scheduled_date TEXT NOT NULL,
                status TEXT NOT NULL,
                rating INTEGER,
                FOREIGN KEY (student_id) REFERENCES students (id),
                FOREIGN KEY (tutor_id) REFERENCES tutors (id)
            )
        ''')

        conn.commit()

    app.run(port=5000, debug=True)
