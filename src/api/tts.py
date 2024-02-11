
import io
from io import BytesIO
import numpy as np
import torch
import pathlib


from pydantic import BaseModel
from fastapi.responses import StreamingResponse 
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
from beam import App, Runtime, Image, Volume

from scipy.io.wavfile import write


BASE_DIR = pathlib.Path(__file__).parent


# Beam Volume to store cached models
CACHE_PATH = "./cached_models"
EMBEDDING_NAME = 'objects/embedding.npy'
rate = 16000


EMBEDDING = BASE_DIR / EMBEDDING_NAME


app = App(
    name="tts-api",
    runtime=Runtime(
        cpu=1,
        memory="8Gi",
        image=Image(
            python_version="python3.9",
            python_packages=["scipy","sentencepiece","torch","transformers",
            ],  # You can also add a path to a requirements.txt instead
        ),
    ),
    # Storage Volume for model weights
    volumes=[Volume(name="cached_models", path=CACHE_PATH)],
)


def load_mdl():
    
    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
    model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")

    return processor, model, vocoder



class TextRequest(BaseModel):
    text: str




@app.rest_api(loader=load_mdl)
def api_tts(text_request: TextRequest):


    processor, model, vocoder  = inputs["context"]
        
    text = text_request.text

    inputs = processor(text=text, return_tensors="pt")
    speaker_embedding = np.load(EMBEDDING)
    input_ids = inputs["input_ids"]
    input_ids = input_ids[..., :model.config.max_text_positions]

    speaker_embedding = torch.tensor(speaker_embedding).unsqueeze(0)
    speech = model.generate_speech(input_ids, speaker_embedding, vocoder=vocoder)


    # Convert PyTorch tensor to NumPy array
    speech_np = speech.numpy()

    # Scale the values to the appropriate range for 16-bit PCM audio
    scaled_speech = (speech_np * 32767).astype(np.int16)

    # Convert NumPy array to BytesIO
    wav_bytesio = BytesIO()
    write(wav_bytesio, rate, scaled_speech)

    # Set appropriate headers for a WAV file
    headers = {
        'Content-Disposition': 'attachment; filename=output.wav',
        'Content-Type': 'audio/wav',
    }

    # Return a StreamingResponse with the BytesIO content
    return StreamingResponse(io.BytesIO(wav_bytesio.getvalue()), headers=headers)
