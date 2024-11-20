from flask import jsonify
from ..db import get_db


class GetData:
    def __init__(self, hash : str):
        self._hash = hash

    @property
    def get_hash(self) -> str:
        return self._hash

     # Hash will be not set after creation


    def _decode_text(self, text : str) -> str:

        # implement some logic 
        return text
    
    def _get_text_from_db(self) -> str:
        # Get the database connection
        db = get_db()

        query = """
        SELECT * FROM secret;

        """
    
    def get_secret(self):
        return jsonify({"secret" : str(self._decode_text(self._get_text_from_db()))}), 200

