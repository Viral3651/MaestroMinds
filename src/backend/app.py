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
    role = data.get('role', 'student')  # Role can be 'student', 'tutor', or 'both'
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

        # Insert role-specific data into the respective tables
        if role in ['student', 'both']:
            cursor.execute('''
                INSERT INTO students (user_id) 
                VALUES (?)
            ''', (user_id,))
        if role in ['tutor', 'both']:
            department = data.get('department', None)
            if department:
                cursor.execute('''
                    INSERT INTO tutors (user_id, department) 
                    VALUES (?, ?)
                ''', (user_id, department))

        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Username or email already exists'}), 409
    finally:
        conn.close()

    return jsonify({'message': 'User registered successfully'}), 201

# Endpoint to register a new tutor (for existing users)
@app.route('/api/tutorregistration', methods=['POST'])
def tutor_register():
    data = request.get_json()
    username = data['username']
    department = data['department']

    try:
        # Check if the user already exists in the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            SELECT * FROM users WHERE username = ?
        ''', (username,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'message': 'User does not exist. Please register as a user first.'}), 404

        user_id = user['id']

        # Update the user's role if they are not already a tutor
        if user['role'] == 'student':
            cursor.execute('''
                UPDATE users SET role = 'both' WHERE id = ?
            ''', (user_id,))
        elif user['role'] == 'tutor':
            return jsonify({'message': 'User is already registered as a tutor'}), 409

        # Insert tutor-specific data into the tutors table
        cursor.execute('''
            INSERT INTO tutors (user_id, department) 
            VALUES (?, ?)
        ''', (user_id, department))
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Tutor registration failed'}), 409
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
# Define the endpoint to check if a user is in the database. this is used for error detection.
@app.route('/api/users', methods=['GET'])
def check_user_exists():
    conn = get_db_connection()
    cursor = conn.cursor()

    username = request.args.get('username')
    email = request.args.get('email')

    # Query the database to check if the user exists
    query = 'SELECT * FROM users WHERE username = ? OR email = ?'
    cursor.execute(query, (username, email))
    row = cursor.fetchone()
    conn.close()

    # If the user exists, return a JSON response with exists: true
    if row:
        return jsonify({'exists': True})
    else:
        return jsonify({'exists': False})

# End point to retrieve a tutor profile
@app.route('/api/tutor/<int:user_id>', methods=['GET'])
def get_tutor_profile(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT users.first_name, users.last_name, users.email, tutors.department
        FROM users
        JOIN tutors ON users.id = tutors.user_id
        WHERE users.id = ?
    ''', (user_id,))
    tutor = cursor.fetchone()
    conn.close()

    if tutor is None:
        return jsonify({'message': 'Tutor not found'}), 404

    return jsonify({
        'first_name': tutor['first_name'],
        'last_name': tutor['last_name'],
        'email': tutor['email'],
        'department': tutor['department']
    }), 200


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
            bio TEXT,
            interests TEXT,
            profile_picture BLOB,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
        #conn.execute('''
        #ALTER TABLE students 
        #ADD COLUMN bio TEXT
    #''')
        #conn.execute('''
        #ALTER TABLE students 
        #ADD COLUMN interests TEXT
    #''')
        #conn.execute('''
        #ALTER TABLE students 
        #ADD COLUMN profile_picture BLOB
    #''')

    # Tutors Table
        conn.execute('''
        CREATE TABLE IF NOT EXISTS tutors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            department TEXT NOT NULL,
            rating REAL,
            description TEXT,
            profile_picture BLOB,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
        #conn.execute('''
        #ALTER TABLE tutors
        #ADD COLUMN description TEXT
    #''')
        #conn.execute('''
        #ALTER TABLE tutors
        #ADD COLUMN profile_picture BLOB
    #''')

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
