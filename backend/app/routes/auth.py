from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app.models.user import User
from app import db
from flask_mail import Mail, Message
from flask import current_app
from app.utils.token import generate_reset_token, verify_reset_token
from flask_jwt_extended import jwt_required, get_jwt_identity
import random
import time
import uuid

mail = Mail()

auth_bp = Blueprint("auth", __name__)



@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username exists"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email exists"}), 400

    unique_id = random.randint(100000, 999999)  # Generate a unique integer ID for the user
    user = User(id=unique_id, username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created", "user_id": unique_id}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    print(f"Generated access token: {access_token} + {user.id}")  # Debugging line
    return jsonify(access_token=access_token), 200


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    username = data.get('username')
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'error': 'Username does not exist.'}), 404

    otp = str(random.randint(100000, 999999)).strip()  # Ensure no whitespace
    expiry = int(time.time()) + 600  # 10 minutes

    user.reset_otp = otp
    user.otp_expiry = expiry
    db.session.commit()

    msg = Message('Your Password Reset OTP', recipients=[user.email])
    msg.body = f'Your OTP is: {otp} (valid for 10 minutes)'
    mail.send(msg)

    return jsonify({'message': 'OTP sent to your email.'}), 200

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    username = data.get('username')
    otp = data.get('otp', '').strip()  # Trim whitespace
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    current_time = int(time.time())
    if (
        not user.reset_otp or 
        user.reset_otp.strip() != otp or 
        current_time > user.otp_expiry
    ):
        return jsonify({'error': 'Invalid or expired OTP'}), 400

    user.set_password(password)
    user.reset_otp = None
    user.otp_expiry = None
    db.session.commit()

    return jsonify({'message': 'Password reset successful!'}), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    print("Fetching user profile...")
    current_user_id = get_jwt_identity()
    print(f"Current user ID: {current_user_id}")
    user = User.query.filter_by(id=current_user_id).first()

    if user:
        return jsonify({'error': 'User not found'}), 404

    user_data = {
        'username': user.username,
        'email': user.email,
        'id': user.id
    }
    return jsonify(user_data), 200
# def update_profile():
#     data = request.get_json()
#     username = data.get('username')
#     email = data.get('email')
#     id = data.get('id')

#     user_data = {
#         'username': username,
#         'email': email,
#         'id': id
#     }
#     return jsonify(user_data), 200
    