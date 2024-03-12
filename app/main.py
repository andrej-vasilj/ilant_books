from os import getenv
from typing import Optional
from fastapi import FastAPI, HTTPException
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
API_KEY = getenv('API_KEY')
GOOGLE_URL = getenv('GOOGLE_URL')

@app.get("/search/")
def search(query_string: str, start_index: Optional[int] = 0):
    r = requests.get(f'{GOOGLE_URL}?q={query_string}&startIndex={start_index}&key={API_KEY}')
    data = r.json()
    if 'error' in data:
        raise HTTPException(status_code=data['error']['code'], detail=data['error']['message'])
    return data
