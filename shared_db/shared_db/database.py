from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app, db_uri: str):
    """
    Call this from each Flask app once during startup.
    db_uri is optional — if not provided we read DATABASE_URL env var.
    """
    uri = db_uri
    if not uri:
        raise RuntimeError("DATABASE_URL not set and no db_uri provided")
    app.config.setdefault("SQLALCHEMY_DATABASE_URI", uri)
    app.config.setdefault("SQLALCHEMY_TRACK_MODIFICATIONS", False)
    db.init_app(app)
