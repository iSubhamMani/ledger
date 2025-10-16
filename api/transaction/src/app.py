from flask import Flask
import os
from dotenv import load_dotenv
from shared_db import init_db
from flask_cors import CORS
from controllers.add_txn import add_txn

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
    return add_txn()

if __name__ == "__main__":
    app.run(port=8001, debug=True)
