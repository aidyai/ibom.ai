import uvicorn
import io
from io import BytesIO
import numpy as np
import torch
import pathlib

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse 

from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
from scipy.io.wavfile import write


BASE_DIR = pathlib.Path(__file__).parent


# Beam Volume to store cached models
EMBEDDING_NAME = 'objects/embedding.npy'
rate = 16000


EMBEDDING = BASE_DIR / EMBEDDING_NAME


app = FastAPI()


    
class TextRequest(BaseModel):
    text: str




@app.post('/generate')
def api_tts(text_request: TextRequest):


    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
    model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")


        
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





#if __name__ == "__main__":
#    uvicorn.run("main:app", port=8000, reload=True)


if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=10000, reload=True)