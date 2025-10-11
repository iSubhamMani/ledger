from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from shared_db.models import Transaction
from shared_db import init_db, db
from flask_cors import CORS
import jwt

load_dotenv()
app = Flask(__name__)
init_db(app, os.getenv("DATABASE_URL"))

FRONTEND_URL = os.getenv("FRONTEND_URL")
CORS(
    app,
    supports_credentials=True,
    origins=[FRONTEND_URL] if FRONTEND_URL else ["http://localhost:3000"],
)

@app.route("/add_transaction", methods=["POST"])
def addTransaction():
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

if __name__ == "__main__":
    app.run(port=8001, debug=True)
