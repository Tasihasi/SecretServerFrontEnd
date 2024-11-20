import os

class Config:
    SECRET_KEY = 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DATABASE = os.path.join(os.getcwd(), 'flask_app', 'app.db')  # Absolute path to app.db
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

