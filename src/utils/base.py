import pathlib
from pathlib import Path
from modal import Image, Stub

BASE_DIR = pathlib.Path(__file__).parent
stub = Stub(name="ibom")

api_image = (
    Image.debian_slim()
    .apt_install(
        "libglib2.0-0", "libsm6", "libxrender1", "libxext6", "ffmpeg", "libgl1"
    )
    .pip_install_from_requirements(BASE_DIR/"objects/requirements.txt")
)


# Assuming that the JSON file is in the same directory as this script
JSON_FILENAME = 'objects/dict5k_.json'
EMBEDDING_NAME = 'objects/embedding.npy'

JSON_FILE_PATH = BASE_DIR / JSON_FILENAME
EMBEDDING = BASE_DIR / EMBEDDING_NAME

