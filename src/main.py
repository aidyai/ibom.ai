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
from fastapi import FastAPI, status, File, Request, UploadFile, Query, Form, HTTPException, Depends, Cookie, Response

#from fastapi import FastAPI, File, Form, Depends, UploadFile, Query, HTTPException
from fastapi.responses import FileResponse, PlainTextResponse
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request
from starlette.responses import Response
from starlette.routing import Route
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse, StreamingResponse
from fastapi.exceptions import HTTPException
#from fastapi.middleware.sessions import SessionMiddleware


from .utils.search import load_json_file, search
from .utils.base import JSON_FILE_PATH, firebaseConfig, json_data#,CREDENTIALS


import pyrebase
import firebase_admin
from firebase_admin import credentials, auth
from .models import LoginSchema,SignUpSchema
from typing import Dict




BASE_DIR = pathlib.Path(__file__).parent


load_dotenv()
app = FastAPI()
app.mount("/frontend/static", StaticFiles(directory= BASE_DIR/"frontend/static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR/"frontend/template"))

# Initialize session middleware
app.add_middleware(SessionMiddleware, secret_key="0912axc56@")
user_database: Dict[str, Dict[str, str]] = {}


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
    #user_data = {"email": "aidy@gmail.com"}
    #return templates.TemplateResponse("profile.html", {"request": request, "user_data": user_data})
    return templates.TemplateResponse("pre.html", {"request":request})



@app.post("/signup")
async def create_account(request: Request, full_name: str = Form(...), email: str = Form(...), password: str = Form(...)):
    try:
        # Create user with provided email and password
        user = auth.create_user(
            email=email,
            password=password
        )
        # Redirect to home page after successful sign-up
        response = RedirectResponse(url="/home", status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=user.uid)
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post('/login')
async def access_token_create(request: Request, email: str = Form(...), password: str = Form(...)):
    try:
        user = authe.sign_in_with_email_and_password(
            email = email,
            password = password
        )
        response = RedirectResponse(url="/home", status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=user.uid)
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid email or password")



@app.get("/home", response_class=HTMLResponse)
async def home(request: Request, user_id: Optional[str] = Cookie(None)):
    if user_id:
        try:
            user = auth.get_user(user_id)
            # Fetch user data from database based on user ID
            # For demonstration, I'm just passing the user's email
            user_data = {"email": user.email}
            return templates.TemplateResponse("profile.html", {"request": request, "user_data": user_data})
        except Exception as e:
            # Handle unauthorized access or invalid user ID
            return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
    else:
        # Redirect to login page if user is not authenticated
        return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)