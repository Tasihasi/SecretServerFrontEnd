from datetime import datetime, timedelta
import hashlib
from flask import jsonify
from ..db import get_db



class PostData:
    def __init__(self, secret_text: str, expire_after_views: int, expire_after: int):
        if expire_after_views < 1 or expire_after < 0:
            raise ValueError("Expiration values must be non-negative")
        
        self._secret_text = secret_text
        self._expire_after_views = expire_after_views
        self._expire_after = expire_after
        self._hash = self._generate_hash()
        self._created_at = datetime.now()
        self._expiration_date = self._calculate_expiration()


     # Getter and Setter for _secret_text
    @property
    def secret_text(self) -> str:
        return self._secret_text

    @secret_text.setter
    def secret_text(self, value) -> None:
        self._secret_text = value

    # Getter and Setter for _expire_after_views
    @property
    def expire_after_views(self) -> int:
        return self._expire_after_views

    @expire_after_views.setter
    def expire_after_views(self, value) -> None:
        if value < 0:
            raise ValueError("expire_after_views must be non-negative")
        self._expire_after_views = value

    # Getter and Setter for _expire_after
    @property
    def expire_after(self) -> int:
        return self._expire_after

    @expire_after.setter
    def expire_after(self, value) -> None:
        if value < 0:
            raise ValueError("expire_after must be non-negative")
        self._expire_after = value

    # Getter for _hash (no setter needed for hash)
    @property
    def hash(self) -> str:
        return self._hash

    # Getter for _created_at (no setter needed for created_at)
    @property
    def created_at(self) -> datetime:
        return self._created_at

    # Getter for _expiration_date (no setter needed for expiration_date)
    @property
    def expiration_date(self) -> datetime:
        return self._expiration_date

    def _generate_hash(self):
        # Simple hash generation method
        return hashlib.sha256(self.secret_text.encode()).hexdigest()

    def _calculate_expiration(self):
        if self.expire_after <= 0:
            return None
        else:
            return self.created_at + timedelta(minutes=self.expire_after)


    def _to_dict(self):
        # Returns secret data as dictionary for JSON or XML responses
        return {
            "hash": self.hash,
            "secret": self.secret_text,
            "expire_after_views": self.expire_after_views,
            "expire_after": self.expire_after,
            "created_at": self.created_at.isoformat(),
            "expiration_date": self.expiration_date.isoformat() if self.expiration_date else None,
        }
    
    def _check_necessary_data(self) -> bool:
        if self.hash and self.secret_text and self.expire_after and self.expire_after_views:
            return True
        
        return False
    
    def post_to_db(self) -> bool:

        if not self._check_necessary_data():
            return False

        # Get the database connection
        db = get_db()

        # Prepare the insert query and data
        query = """
        INSERT INTO secret (hashText, secretMessage, retrievalCount, expiration)
        VALUES (?, ?, ?, ?)
        """
        data = (
            self.hash,
            self.secret_text,
            self.expire_after_views,
            self.expire_after
        )

        try:
            # Execute the query and commit the transaction

            # TODO check if the hash is in the table and gen unique hash
            db.execute(query, data)
            db.commit()
            return True
        except Exception as e:
            print(f"An error occurred: {e}")
            db.rollback()
            return False
    
    
