from utils.validate_user import validate_user
from shared_db.models import Transaction
from flask import jsonify

def get_recent_txns():
    decoded, error_response, status_code = validate_user()
    if error_response:
        return error_response, status_code
    
    userId = decoded["id"]

    txns = Transaction.query.filter_by(user_id=userId).order_by(Transaction.created_at.desc()).limit(10).all()
    txn_list = [
        {
            "id": txn.id,
            "txn_mode": txn.txn_mode,
            "category": txn.category,
            "txn_type": txn.txn_type,
            "amount": txn.amount,
            "txn_date": txn.txn_date.isoformat(),
            "comment": txn.comment
        }
        for txn in txns
    ]

    return jsonify(txn_list), 200