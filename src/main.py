import io
import base64
from io import BytesIO
import os
import pathlib
from pathlib import Path
import uvicorn
import json
import asyncio

import numpy as np
import torch



from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, File, Form, UploadFile, Request, Query, HTTPException
from fastapi.responses import FileResponse, PlainTextResponse
from starlette.requests import Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from transformers import pipeline
from scipy.io.wavfile import write
import soundfile as sf


from src.utils.search import load_json_file, search_
from src.utils.base import JSON_FILE_PATH, EMBEDDING




synthesiser = pipeline("text-to-speech", "microsoft/speecht5_tts")


BASE_DIR = pathlib.Path(__file__).parent

app = FastAPI()
app.mount("/frontend/static", StaticFiles(directory= BASE_DIR/"frontend/static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR/"frontend/template"))


class TextRequest(BaseModel):
    text: str





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


@app.post('/geneate')
async def api_tts(text_request: TextRequest):
    text = text_request.text

    # Load speaker embedding
    speaker_embedding = np.load(EMBEDDING)
    speaker_embedding = torch.tensor(speaker_embedding).unsqueeze(0)

    # Generate speech asynchronously
    async def generate_speech():
        nonlocal speaker_embedding
        speech = synthesiser(text, forward_params={"speaker_embeddings": speaker_embedding})
        audio_data = np.int16(speech["audio"] * 32767).tobytes()
        return audio_data

    # Run the speech generation task asynchronously
    audio_data = await generate_speech()

    # Return the audio data as a StreamingResponse
    return StreamingResponse(io.BytesIO(audio_data), media_type="audio/wav")


@app.post('/generate')
async def api_tts(text_request: TextRequest):
    try:
        text = text_request.text

        # Load speaker embedding
        speaker_embedding = np.load(EMBEDDING)
        speaker_embedding = torch.tensor(speaker_embedding).unsqueeze(0)

        # Generate speech asynchronously
        speech = synthesiser(text, forward_params={"speaker_embeddings": speaker_embedding})

        # Encode audio data as base64
        audio_base64 = base64.b64encode(speech["audio"].tobytes()).decode('utf-8')

        return {"audio_base64": audio_base64}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing TTS request: {str(e)}")