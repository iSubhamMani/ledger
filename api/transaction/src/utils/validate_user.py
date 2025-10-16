from flask import request, jsonify
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

def validate_user():
    token = request.cookies.get("auth_token")
    if not token:
        return None, jsonify({"error": "Unauthorized"}), 401

    try:
        decoded = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        return decoded, None, None
    except jwt.ExpiredSignatureError:
        return None, jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return None, jsonify({"error": "Invalid token"}), 401