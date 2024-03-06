import os
import pathlib
from dotenv import load_dotenv




load_dotenv()


BASE_DIR = pathlib.Path(__file__).parent

JSON_FILENAME = 'objects/dict5k_.json'
JSON_FILE_PATH = BASE_DIR / JSON_FILENAME

CREDENTIALS = BASE_DIR / 'objects/vauth.json'


# Access the environment variables
firebaseConfig = {
    'apiKey': os.getenv("API_KEY"),
    'authDomain': os.getenv("AUTH_DOMAIN"),
    'projectId': os.getenv("PROJECT_ID"),
    'databaseURL': os.getenv("DATABASE_URL"),
    'storageBucket': os.getenv("STORAGE_BUCKET"),
    'messagingSenderId': os.getenv("MESSAGING_SENDER_ID"),
    'appId': os.getenv("APP_ID"),
    'measurementId': os.getenv("MEASUREMENT_ID"),
    'name': os.getenv("NAME")
}


firebase_credentials = {
    "type": os.getenv("type"),
    "project_id": os.getenv("PROJECT_ID"),
    "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    "private_key":os.getenv("PRIVATE_KEY"),
    "client_email": os.getenv("CLIENT_EMAIL"),
    "client_id": os.getenv("CLIENT_ID"),
    "auth_uri": os.getenv("AUTH_URI"),
    "token_uri": os.getenv("TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
    "universe_domain": os.getenv("UNIVERSE_DOMAIN")
}