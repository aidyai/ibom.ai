import os
import pathlib
from pathlib import Path
import uvicorn
import json
import asyncio

import io
from io import BytesIO
import numpy as np
import torch
from scipy.io.wavfile import write
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan


from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, File, Form, UploadFile, Request, Query, HTTPException
from fastapi.responses import StreamingResponse, FileResponse, PlainTextResponse
from starlette.requests import Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import ray
from ray import serve

from src.utils.search import load_json_file, search_
from src.utils.base import EMBEDDING, JSON_FILE_PATH


processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")


BASE_DIR = pathlib.Path(__file__).parent

app = FastAPI()
app.mount("/frontend/static", StaticFiles(directory= BASE_DIR/"frontend/static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR/"frontend/template"))


rate = 16000


class TextRequest(BaseModel):
    text: str


@app.post("/generate_wav")
async def generate_wav(text_request: TextRequest):
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



# Add your FastAPI routes and functions below
@app.get("/", response_class=HTMLResponse)
async def home(request:Request):
    return templates.TemplateResponse("ndex.html", {"request":request})


@app.get("/search", response_class=HTMLResponse)
async def search(request:Request, query: str = Query(..., title="Search Query", description="The word to search for")):
    #json_file_path = BASE_DIR/'dict5k_.json'  # Replace with the actual path to your JSON file

    results = search_(query, JSON_FILE_PATH)

    return templates.TemplateResponse("ndex.html", {"request": request, "results": results})

@app.get("/ibom-api/")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("pre.html", {"request":request})

@app.get("/ibom-api/speak")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("co.html", {"request":request})

@app.get("/ibom-api/write")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("api.html", {"request":request})
