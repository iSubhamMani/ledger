from flask import redirect, make_response
import os
from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")

def logout():
    resp = make_response(redirect(f"{FRONTEND_URL}/"))
    resp.set_cookie("auth_token", "", expires=0)
    return resp