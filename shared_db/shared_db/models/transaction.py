from ..database import db

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    txn_mode = db.Column(db.Enum('Cash', 'Card', 'UPI', name='transaction_mode'), nullable=False)
    category = db.Column(db.Enum(
        "Shopping",
        "Food",
        "Home",
        "Transport",
        "Health",
        "Gifts",
        "Savings",
        "Salary",
        "Other", 
        name='transaction_category'), nullable=False)
    txn_type = db.Column(db.Enum('expense', 'income', name='transaction_type'), nullable=False)
    amount = db.Column(db.Float, nullable=False)