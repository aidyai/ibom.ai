
import io
import os
import json
import asyncio
import pathlib
from pathlib import Path
from io import BytesIO


from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, File, Form, UploadFile, Request, Query, HTTPException
from fastapi.responses import StreamingResponse, FileResponse, PlainTextResponse, HTMLResponse, JSONResponse
from fastapi import Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


import modal
from modal import Image, Mount, asgi_app, web_endpoint
#from .common import stub

from src.utils.model import load_model
from src.utils.base import JSON_FILE_PATH, EMBEDDING, stub

BASE_DIR = pathlib.Path(__file__).parent
rate = 16000





@stub.function(
    #mounts=[Mount.from_local_dir(static_path, remote_path="/assets")],
    container_idle_timeout=300,
    timeout=600,)

@asgi_app()
def web():


    import numpy as np
    import torch
    from scipy.io.wavfile import write
    from src.utils.search import load_json_file, search_



    BASE_DIR = pathlib.Path(__file__).parent

    app = FastAPI()
    app.mount("/static", StaticFiles(directory= BASE_DIR/"frontend/static"), name="static")
    templates = Jinja2Templates(directory=str(BASE_DIR/"frontend/template"))


    #astAPI routes and functions below
    @app.get("/", response_class=HTMLResponse)
    async def home(request:Request):
        return templates.TemplateResponse("ndex.html", {"request":request})


    @app.get("/search", response_class=HTMLResponse)
    async def search(request:Request, query: str = Query(..., title="Search Query", description="The word to search for")):
        #json_file_path = BASE_DIR/'dict5k_.json'  # Replace with the actual path to your JSON file

        results = search_(query, JSON_FILE_PATH)

        return templates.TemplateResponse("ndex.html", {"request": request, "results": results})

    @app.get("/api/")
    async def ibom_api_page(request:Request):
        return templates.TemplateResponse("pre.html", {"request":request})

    @app.get("/api/speak")
    async def ibom_api_page(request:Request):
        return templates.TemplateResponse("co.html", {"request":request})

    @app.get("/api/write")
    async def ibom_api_page(request:Request):
        return templates.TemplateResponse("api.html", {"request":request})


    return app