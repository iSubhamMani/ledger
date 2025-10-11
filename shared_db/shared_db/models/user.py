from ..database import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    photo = db.Column(db.String(250))
    name = db.Column(db.String(100), nullable=False)
    daily_expense_limit = db.Column(db.Integer, nullable=True)
    weekly_expense_limit = db.Column(db.Integer, nullable=True)
    monthly_expense_limit = db.Column(db.Integer, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "photo": self.photo,
            "name": self.name,
            "daily_expense_limit": self.daily_expense_limit,
            "weekly_expense_limit": self.weekly_expense_limit,
            "monthly_expense_limit": self.monthly_expense_limit,
        }
    