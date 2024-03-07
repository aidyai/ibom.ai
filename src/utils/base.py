import os
import json
import pathlib
from dotenv import load_dotenv
from cryptography.fernet import Fernet





load_dotenv()


BASE_DIR = pathlib.Path(__file__).parent

JSON_FILENAME = 'objects/dict5k_.json'
JSON_FILE_PATH = BASE_DIR / JSON_FILENAME
CREDENTIALS = BASE_DIR / 'objects/auth.json'


ferret_key = os.getenv("ENCRYPTION_KEY")
cipher = Fernet(ferret_key.encode())
ENCRYPTED_DATA = BASE_DIR / 'objects/encypt.txt'


# Generate a key
#key = Fernet.generate_key()

# Convert the bytes-like key to a string
#key_string = key.decode()
#print(key_string)
# Store the key string in an environment variable
#os.environ["ENCRYPTION_KEY"] = key_string

# Read the JSON file
#with open(CREDENTIALS, 'r') as file:
#    json_data = json.load(file)

# JSON data to bytes
#json_bytes = json.dumps(json_data).encode()

# Retrieve the key from the environment variable
#key_from_env = os.getenv("ENCRYPTION_KEY")

# Recreate the cipher object using the key from the environment variable
#cipher = Fernet(key_from_env.encode())

# Encrypt JSON data
#encrypted_data = cipher.encrypt(json_bytes)
#with open(ENCRYPTED_DATA, 'wb') as file:
#    file.write(encrypted_data)

# Decrypting the data

# Read the encrypted data from the file
with open(ENCRYPTED_DATA, 'rb') as file:
    encrypted_data = file.read()

# Decrypt the data
decrypted_data = cipher.decrypt(encrypted_data)

# Decoding the decrypted data
json_string = decrypted_data.decode()

# Load JSON
json_data = json.loads(json_string)

# Now you can work with the JSON data as a Python dictionary
#print(json_data)

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
