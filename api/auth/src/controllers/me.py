from flask import request, jsonify
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")

def me():
    token = request.cookies.get("auth_token")
    if not token:
        return jsonify({"error": "Unauthorized"}), 401
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return jsonify({
            "id": payload["id"],
            "name": payload["name"],
            "photo": payload["photo"],
        })
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
    