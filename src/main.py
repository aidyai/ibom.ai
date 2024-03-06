
import pathlib
from pathlib import Path
import uvicorn
import json
from dotenv import load_dotenv
import os
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
from fastapi.exceptions import HTTPException

from .utils.search import load_json_file, search_
from .utils.base import JSON_FILE_PATH, firebaseConfig, CREDENTIALS


import pyrebase
import firebase_admin
from firebase_admin import credentials, auth
from .models import LoginSchema,SignUpSchema





BASE_DIR = pathlib.Path(__file__).parent


load_dotenv()
app = FastAPI()
app.mount("/frontend/static", StaticFiles(directory= BASE_DIR/"frontend/static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR/"frontend/template"))

if not firebase_admin._apps:
    cred = credentials.Certificate(CREDENTIALS)
    firebase_admin.initialize_app(cred)



#print(firebase_credentials)





#firebase = pyrebase.initialize_app()
firebase = pyrebase.initialize_app(firebaseConfig)
#db = firebase.database()
auth = firebase.auth()


class TextRequest(BaseModel):
    text: str





# Add your FastAPI routes and functions below
@app.get("/", response_class=HTMLResponse)
async def home(request:Request):
    return templates.TemplateResponse("nav.html", {"request":request})


@app.get("/search", response_class=HTMLResponse)
async def search(request:Request, query: str = Query(..., title="Search Query", description="The word to search for")):
    #json_file_path = BASE_DIR/'dict5k_.json'  # Replace with the actual path to your JSON file

    results = search_(query, JSON_FILE_PATH)
    return templates.TemplateResponse("nav.html", {"request": request, "results": results})
    

@app.get("/db/speak")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("speak.html", {"request":request})


@app.get("/db/write")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("write.html", {"request":request})


@app.get("/db")
async def ibom_api_page(request:Request):
    return templates.TemplateResponse("dash.html", {"request":request})


@app.get('/gpt')
async def page(request:Request):
    return templates.TemplateResponse("gpt.html", {"request":request})

@app.get('/nh')
async def page(request:Request):
    return templates.TemplateResponse("index.html", {"request":request})



@app.post('/signup')
async def create_acccount(user_data:SignUpSchema):
    email = user_data.email
    password = user_data.password
    try:
        user = auth.create_user(
            email = email,
            password = password
        )
        return JSONResponse(content={"message": f"{user.uid} account, succesfully created"},
                            status_code=201)    
    except auth.EmailAlreadyExistsError:
        raise HTTPException(
            status_code=400,
            detail=f"User account for {email} already exists"
        )


@app.post('/login')
async def access_token_create(user_data:LoginSchema):
    email = user_data.email
    password = user_data.password
    try:
        user = firebase.auth().sign_in_with_email_and_password(
            email = email,
            password = password
        )

        token = user['idToken']
        return JSONResponse(
            content={
                "token":token
                }, status_code=200
        )
    except:
        raise HTTPException(
            status_code=400,detail="Invalid Credentials"
        )


@app.post('/pint')
async def val_access_token(request:Request):
    headers = request.headers
    jwt = headers.get('authorization')

    user = auth.verify_id_token(jwt)
    return user['user_id']
  