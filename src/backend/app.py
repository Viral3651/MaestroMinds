from flask import Flask, request, jsonify
import sqlite3
from bcrypt import hashpw, gensalt, checkpw

app = Flask(__name__)
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
    username = data['username']
    email = data['email']
    password = data['password']

    # Hash the password
    hashed_password = hashpw(password.encode('utf-8'), gensalt())

    # Insert the new user into the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO users (username, email, password) 
        VALUES (?, ?, ?)
    ''', (username, email, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({'message': 'User registered successfully'}), 201

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
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    # Create users table if it doesn't exist
    with get_db_connection() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password BLOB NOT NULL
            )
        ''')
        conn.commit()

    app.run(debug=True)