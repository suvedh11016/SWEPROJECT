from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app.models.user import User
from app import db
from flask_mail import Mail, Message
from flask import current_app
from app.utils.token import generate_reset_token, verify_reset_token
from flask_jwt_extended import jwt_required, get_jwt_identity

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

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    username = data.get('username')
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'error': 'Username does not exist.'}), 404

    token = generate_reset_token(user.email)
    reset_link = f"http://localhost:3000/reset-password/{token}"
    msg = Message('Password Reset Request', recipients=[user.email])
    msg.body = f'Click the link to reset your password: {reset_link}'
    mail.send(msg)
    return jsonify({'message': 'A reset link has been sent to your registered email.'}), 200


@auth_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    email = verify_reset_token(token)
    if not email:
        return jsonify({'error': 'Invalid or expired token'}), 400

    data = request.get_json()
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.set_password(password)
    db.session.commit()
    return jsonify({'message': 'Password updated successfully'}), 200
