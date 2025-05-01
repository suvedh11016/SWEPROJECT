from flask import jsonify
from flask_jwt_extended import JWTManager
from flask_jwt_extended.exceptions import NoAuthorizationError

def register_jwt_handlers(app, jwt: JWTManager):
    @app.errorhandler(NoAuthorizationError)
    def handle_no_auth(e):
        return jsonify({"error": "Missing Authorization Header"}), 401

    @jwt.invalid_token_loader
    def handle_invalid_token(err):
        return jsonify({"error": "Invalid token"}), 401

    @jwt.expired_token_loader
    def handle_expired_token(jwt_header, jwt_payload):
        return jsonify({"error": "Token expired"}), 401

    @jwt.unauthorized_loader
    def handle_missing_token(msg):
        return jsonify({"error": "Missing or invalid token"}), 401

    @jwt.revoked_token_loader
    def handle_revoked_token(jwt_header, jwt_payload):
        return jsonify({"error": "Token has been revoked"}), 401
