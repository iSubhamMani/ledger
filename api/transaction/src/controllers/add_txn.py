from flask import request, jsonify
from dotenv import load_dotenv
from shared_db import db
from shared_db.models import Transaction
from utils.validate_user import validate_user
from datetime import datetime

load_dotenv()

def add_txn():
    decoded, error_response, status_code = validate_user()
    if error_response:
        return error_response, status_code
    
    userId = decoded["id"]
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    txn_data = Transaction(
        user_id=userId,
        txn_mode=data["txn_mode"],
        category=data["category"],
        txn_type=data["txn_type"],
        amount=float(data["amount"]),
        txn_date=data["txn_date"],
        comment=data["comment"].strip() if data["comment"] else None,
        created_at= datetime.now()
    )

    db.session.add(txn_data)
    db.session.commit()

    return jsonify({"message": "Transaction added successfully"}), 201