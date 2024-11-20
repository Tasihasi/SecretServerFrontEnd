from flask import Flask
from flask_cors import CORS
from . import db



def create_app():
    app = Flask(__name__)

    # TODO correct path
    app.config.from_object('config.Config')
    #app.config.from_object('app.config.Config')

    # Initialize the database with the app
    db.init_app(app)

    # Register the command for initializing the database
    app.cli.add_command(db.init_db_command)

    CORS(app)

    with app.app_context():
        from .controller.routes import main_blueprint

        app.register_blueprint(main_blueprint)


    return app
