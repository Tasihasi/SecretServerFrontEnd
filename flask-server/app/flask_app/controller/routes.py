from flask import current_app as app, render_template
from flask import Blueprint, request, jsonify
from ..model import GetData, PostData
from .Is_valid_request import is_valid_request
import logging

# Create a blueprint instance
main_blueprint = Blueprint('main', __name__)

@main_blueprint.route("/")
def home():
    return "<p>Hello, World!</p>"


@main_blueprint.route("/secret/<hash>", methods=['GET', 'POST'])
@main_blueprint.route("/secret/", methods=['GET', 'POST'])  # This handles the case where no hash is provided.
def secret(hash=None):
    print("hii")
    logging.info("hii")
    if hash:        # Needs to check if the hash in the route bacse ether i will get an error
        if request.method == 'POST':
            return jsonify({"Error": "POST request not allowed for specific hash."}), 400
        # If a hash is provided, return the hash or perform some other logic.

        get_data = GetData(hash)
        return get_data.get_secret()
        
    if request.method == 'GET':
        

        return jsonify({"Error" : "Invalid input"}), 405
    
    if not is_valid_request(request):
        return jsonify({"Error" : "Invalid input"}), 405
    
    try:
        post_data = PostData(request.form['secret'], int(request.form['expireAfterViews']), int(request.form['expireAfter']))
        if post_data.post_to_db():
            # Catch missing keys or invalid values
            return jsonify({"Hash" : post_data.hash})
            
    except (KeyError, ValueError) as e:
       return jsonify({"Error" : "Invalid input"}), 405
    
    