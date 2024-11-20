from flask import request

def is_valid_request(req: request) -> bool:
    # Use .get() to avoid KeyErrors when fields are missing
    secret = req.form.get('secret')
    expire_after_views = req.form.get('expireAfterViews')
    expire_after = req.form.get('expireAfter')

    # Check if any required field is missing or has an empty value
    if not secret or not expire_after_views or not expire_after:
        # Return False if any field is missing or empty
        return False

    try:
        # Check if expireAfterViews and expireAfter are valid integers
        expire_after_views = int(expire_after_views)
        expire_after = int(expire_after)
    except ValueError:
        # If any of these fields can't be converted to integers, return False
        return False

    # If all conditions are met, return True
    return True