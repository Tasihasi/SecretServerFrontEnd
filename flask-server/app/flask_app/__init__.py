from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the database object
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Initialize the database with the app
    db.init_app(app)

    CORS(app)

    with app.app_context():
        from .controller.routes import main_blueprint

        app.register_blueprint(main_blueprint)


    return app
