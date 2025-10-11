from flask import redirect, request, jsonify, make_response
import requests
import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from shared_db.models import User
from  shared_db import db

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
JWT_SECRET = os.getenv("JWT_SECRET")
FRONTEND_URL = os.getenv("FRONTEND_URL")
TOKEN_EXPIRY = 60*60*24*7  # 7 days
REDIRECT_URI = "http://localhost/auth/google/callback"

def redirectToGoogleLogin():
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        "?response_type=code"
        f"&client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&scope=openid%20email%20profile"
    )
    return redirect(google_auth_url)

def callback():
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Missing authorization code"}), 400

    # Exchange code for access token
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    token_response = requests.post(token_url, data=data).json()
    id_token = token_response.get("id_token")

    # Get user info
    user_info = requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}"
    ).json()

    email = user_info.get("email")
    name = user_info.get("name")
    sub = user_info.get("sub")
    photo = user_info.get("picture")

    # Find or create user in db

    user = User.query.filter_by(email=email).first()

    if not user:
        user = User(
            email=email,
            name=name,
            photo=photo,
        )
        db.session.add(user)
        db.session.commit()
    else:
        # Optionally update user info if it has changed
        user.name = name or user.name
        user.photo = photo or user.photo
        db.session.commit()

    # Create JWT for your app
    payload = {
        "id": user.id,
        "name": name,
        "photo": photo,
        "exp": datetime.now() + timedelta(days=7)
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    # Set cookie (HttpOnly)
    resp = make_response(redirect(f"{FRONTEND_URL}/add"))
    resp.set_cookie(
        "auth_token",
        jwt_token,
        httponly=True,
        samesite="Lax",
        secure=False,  # Set True in production (HTTPS)
        max_age=TOKEN_EXPIRY
    )

    return resp