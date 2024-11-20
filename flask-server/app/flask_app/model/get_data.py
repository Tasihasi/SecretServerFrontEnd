from flask import jsonify

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
        return "This is the secret :)"

    
    def get_secret(self):
        return jsonify({"secret" : self._decode_text(self._get_text_from_db())}), 200

