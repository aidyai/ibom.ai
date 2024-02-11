import pathlib
from pathlib import Path


BASE_DIR = pathlib.Path(__file__).parent





# Assuming that the JSON file is in the same directory as this script
JSON_FILENAME = 'objects/dict5k_.json'
EMBEDDING_NAME = 'objects/embedding.npy'
rate = 16000


JSON_FILE_PATH = BASE_DIR / JSON_FILENAME
EMBEDDING = BASE_DIR / EMBEDDING_NAME

