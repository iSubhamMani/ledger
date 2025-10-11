from flask import Flask, redirect, request, jsonify, make_response
import os
import jwt
from dotenv import load_dotenv
from flask_cors import CORS
from providers.google import callback as googleCallback, redirectToGoogleLogin
from shared_db import init_db
from shared_db.models import User

load_dotenv()
app = Flask(__name__)
init_db(app, os.getenv("DATABASE_URL")) 

FRONTEND_URL = os.getenv("FRONTEND_URL")
CORS(
    app,
    supports_credentials=True,
    origins=[FRONTEND_URL] if FRONTEND_URL else ["http://localhost:3000"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
JWT_SECRET = os.getenv("JWT_SECRET")

@app.route("/google")
def google_login():
    return redirectToGoogleLogin()

@app.route("/google/callback")
def google_callback():
    return googleCallback()

@app.route("/logout")
def logout():
    resp = make_response(redirect(f"{FRONTEND_URL}/"))
    resp.set_cookie("auth_token", "", expires=0)
    return resp


if __name__ == "__main__":
    app.run(port=8000, debug=True)
