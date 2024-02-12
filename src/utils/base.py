import pathlib



BASE_DIR = pathlib.Path(__file__).parent
JSON_FILENAME = 'objects/dict5k_.json'
EMBEDDING_NAME = 'objects/embedding.npy'


EMBEDDING = BASE_DIR / EMBEDDING_NAME
JSON_FILE_PATH = BASE_DIR / JSON_FILENAME

