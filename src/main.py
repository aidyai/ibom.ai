
import pathlib
from pathlib import Path
import uvicorn
import json
import asyncio





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


from src.utils.search import load_json_file, search_
from src.utils.base import JSON_FILE_PATH




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

@app.get("/db/")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("pre.html", {"request":request})

@app.get("/db/speak")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("co.html", {"request":request})

@app.get("/db/write")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("api.html", {"request":request})

@app.get("/db")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("dashboard.html", {"request":request})

