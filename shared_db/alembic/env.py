import os
import sys
from logging.config import fileConfig
from alembic import context
from sqlalchemy import engine_from_config, pool
from dotenv import load_dotenv

# --- Load environment variables ---
ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(os.path.abspath(ENV_PATH))

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "shared_db"))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# --- Alembic config setup ---
config = context.config
fileConfig(config.config_file_name)

# Set the sqlalchemy.url dynamically
db_url = os.getenv("DATABASE_URL")
if db_url:
    config.set_main_option("sqlalchemy.url", db_url)

# --- Import your db and models ---
from shared_db.database import db
from shared_db.models import * 

target_metadata = db.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
