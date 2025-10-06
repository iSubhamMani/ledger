from flask import Flask, redirect, request, jsonify, make_response
import os
import jwt
from dotenv import load_dotenv
from flask_cors import CORS
from providers.google import callback as googleCallback, redirectToGoogleLogin

load_dotenv()
app = Flask(__name__)

FRONTEND_URL = os.getenv("FRONTEND_URL")
CORS(
    app,
    supports_credentials=True,
    origins=[FRONTEND_URL] if FRONTEND_URL else ["http://localhost:3000"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
JWT_SECRET = os.getenv("JWT_SECRET")

REDIRECT_URI = "http://localhost:8000/auth/google/callback"

@app.route("/auth/google")
def google_login():
    return redirectToGoogleLogin()

@app.route("/auth/google/callback")
def google_callback():
    return googleCallback()

@app.route("/auth/logout")
def logout():
    resp = make_response(redirect(f"{FRONTEND_URL}/"))
    resp.set_cookie("auth_token", "", expires=0)
    return resp


@app.route("/auth/me")
def me():
    token = request.cookies.get("auth_token")
    if not token:
        return jsonify({"authenticated": False}), 401

    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return jsonify({"authenticated": True, "user": data})
    except jwt.ExpiredSignatureError:
        return jsonify({"authenticated": False, "error": "Token expired"}), 401
    except Exception:
        return jsonify({"authenticated": False, "error": "Invalid token"}), 401


if __name__ == "__main__":
    app.run(port=8000, debug=True)
