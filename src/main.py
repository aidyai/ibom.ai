import re
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

from .utils.search import load_json_file, search
from .utils.base import JSON_FILE_PATH, firebaseConfig, json_data#,CREDENTIALS


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
    cred = credentials.Certificate(json_data)
    firebase_admin.initialize_app(cred)



#print(firebase_credentials)





#firebase = pyrebase.initialize_app()
firebase = pyrebase.initialize_app(firebaseConfig)
#db = firebase.database()
authe = firebase.auth()


class TextRequest(BaseModel):
    text: str


# Add your FastAPI routes and functions below
@app.get("/", response_class=HTMLResponse)
async def home(request:Request):
    return templates.TemplateResponse("nav.html", {"request":request})


@app.get("/find", response_class=HTMLResponse)
def find(request:Request, query: str = Query(..., title="Search Query", description="The word to search for")):
    #json_file_path = BASE_DIR/'dict5k_.json'  # Replace with the actual path to your JSON file

    results = search(query, JSON_FILE_PATH)
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

@app.get('/bd')
async def page(request:Request):
    return templates.TemplateResponse("keyboard`.html", {"request":request})



   
@app.post("/signup")
async def signup(request: Request, full_name: str = Form(...), email: str = Form(...), password: str = Form(...)):
    try:
        # Create a user with email and password in Firebase Authentication
        user = auth.create_user(
            email=email,
            password=password,
            display_name=full_name
        )

        # Get the user's email
        #email = "aidysou553@gmail.com" #handle_user_creation()  # Call the function to get the email
        
        # Reload the page after signup
        #return templates.TemplateResponse("nav.html", {"request": request, "email": email})
        # Return success message
        return JSONResponse(content={"message": "User created successfully", "uid": user.uid})
    
    except Exception as e:
        # Handle errors
        error_message = str(e)
        if "email" in error_message and "already" in error_message:
            # Return error message
            return JSONResponse(content={"message": "User with this email already exists"}, status_code=400)
        else:
            # Return generic error message
            return JSONResponse(content={"message": "Error creating user"}, status_code=500)



@app.post('/login')
async def access_token_create(request: Request, email: str = Form(...), password: str = Form(...)):

    try:
        user = authe.sign_in_with_email_and_password(
            email = email,
            password = password
        )

        token = user['idToken']
        return {'message': 'login successful '}
        #return JSONResponse(content={"token":token}, status_code=200)
    
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
  


