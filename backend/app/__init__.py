from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object("app.config.Config")

    db.init_app(app)
    jwt.init_app(app)

    # Import and register blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api")

    # Create tables
    with app.app_context():
        db.create_all()

    return app
