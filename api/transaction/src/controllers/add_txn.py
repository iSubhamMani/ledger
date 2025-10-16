from flask import request, jsonify
import jwt
import os
from dotenv import load_dotenv
from shared_db import db
from shared_db.models import Transaction

load_dotenv()

def add_txn():
    token = request.cookies.get("auth_token");

    if not token:
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        decoded = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except Exception:
        return jsonify({"error": "Invalid token"}), 401
    
    userId = decoded["id"]
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    txn_data = Transaction(
        user_id=userId,
        txn_mode=data["txn_mode"],
        category=data["category"],
        txn_type=data["txn_type"],
        amount=float(data["amount"])
    )

    db.session.add(txn_data)
    db.session.commit()

    return jsonify({"message": "Transaction added successfully"}), 201