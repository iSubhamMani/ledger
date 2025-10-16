from flask import Flask
import os
from dotenv import load_dotenv
from shared_db import init_db
from flask_cors import CORS
from controllers.add_txn import add_txn
from controllers.recent_txns import get_recent_txns

load_dotenv()
app = Flask(__name__)
init_db(app, os.getenv("DATABASE_URL"))

FRONTEND_URL = os.getenv("FRONTEND_URL")
CORS(
    app,
    supports_credentials=True,
    origins=[FRONTEND_URL] if FRONTEND_URL else ["http://localhost:3000"],
)

@app.route("/add", methods=["POST"])
def addTransaction():
    return add_txn()

@app.route("/recent", methods=["GET"])
def recent_txns():
    return get_recent_txns()

if __name__ == "__main__":
    app.run(port=8001, debug=True)
