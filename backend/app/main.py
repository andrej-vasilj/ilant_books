from os import getenv
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
API_KEY = getenv('API_KEY')
GOOGLE_URL = getenv('GOOGLE_URL')

# Setup the FastAPI server and allow CORS for local testing with next.js FE
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# End points
@app.get("/search/")
def search(query_string: str, start_index: Optional[int] = 0):
    r = requests.get(f'{GOOGLE_URL}?q={query_string}&startIndex={start_index}&key={API_KEY}')
    data = r.json()
    if 'error' in data:
        raise HTTPException(status_code=data['error']['code'], detail=data['error']['message'])
    print(data['totalItems'])
    return data
