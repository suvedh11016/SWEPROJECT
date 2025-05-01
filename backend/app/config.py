import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

class Config:
    # Replace values with your actual PostgreSQL info
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:drj@localhost:5432/campus'
    SQLALCHEMY_TRACK_MODIFICATIONS = False


    # JWT setup
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # Mail setup
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True") == "True"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")

    # App secret
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key")
