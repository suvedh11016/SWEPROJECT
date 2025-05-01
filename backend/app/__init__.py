from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail

from app.utils.jwt_handlers import register_jwt_handlers  # ✅ Import custom handlers

mail = Mail()
db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Load app config
    app.config.from_object("app.config.Config")

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)

    # Register custom JWT error handlers
    register_jwt_handlers(app, jwt)

    # Register blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api")

    # Create database tables
    with app.app_context():
        db.create_all()

    return app
