import io
import sys


import modal
from fastapi import FastAPI, Header
from modal import Image, Function, Mount, Stub, asgi_app, web_endpoint
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, StreamingResponse # Import JSONResponse from fastapi.responses
from pydantic import BaseModel





stub = modal.Stub("py")
tts_api_image = (
    modal.Image.debian_slim()
    .apt_install(
        "libglib2.0-0", "libsm6", "libxrender1", "libxext6", "ffmpeg", "libgl1"
    )
    .pip_install("scipy","sentencepiece","torch","transformers")
)

volume = modal.NetworkFileSystem.new()
@stub.function(image=tts_api_image, network_file_systems={"/root/cache": volume})
def load_model():


    from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
    model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")

    return processor, model, vocoder


class TextRequest(BaseModel):
    text: str



#@stub.function()
@stub.function(image=tts_api_image)
@web_endpoint(method="POST")
async def tts_api(text_request: TextRequest):


    import io
    from io import BytesIO
    import torch
    import numpy as np
    from scipy.io.wavfile import write


    from src.utils.base import EMBEDDING, rate





    processor, model, vocoder = load_model()
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

