from setuptools import setup, find_packages

setup(
    name="shared_db",
    version="0.1.0",
    description="Shared SQLAlchemy database models and setup for Flask microservices",
    author="Your Name",
    packages=find_packages(include=["shared_db", "shared_db.*"]),
    include_package_data=True,
    install_requires=[
        "Flask-SQLAlchemy>=3.0",
        "SQLAlchemy>=2.0",
        "python-dotenv>=1.0.0",
    ],
    python_requires=">=3.9",
)
