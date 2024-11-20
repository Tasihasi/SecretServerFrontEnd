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
        if not self._hash:
            return "Hash was not provided."

        # Get the database connection
        db = get_db()

        query = """
        SELECT * FROM secret WHERE hashText = ?;
        """

        try:

            # Execute the query and fetch the result
            result = db.execute(query, (self._hash,)).fetchone()

            # If a row is found, return the secretMessage, otherwise return a default message
            if result:
                return result['secretMessage']
            else:
                return "No secret found for this hash."
        except Exception as e:
            return f"An error occurred while retrieving the secret. Exception : {e}"

    
    def get_secret(self):
        return jsonify({"secret" : str(self._decode_text(self._get_text_from_db()))}), 200

