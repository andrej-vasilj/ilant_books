from os import getenv
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from httpx import AsyncClient, TimeoutException
from dotenv import load_dotenv
from json.decoder import JSONDecodeError

# Load environment variables
load_dotenv()
API_KEY = getenv('API_KEY')
GOOGLE_URL = getenv('GOOGLE_URL')

# Setup the FastAPI server and allow CORS for local testing with next.js FE
app = FastAPI(
    title="Ilant Books API",
    summary="Possibly the coolest Google Books API wrapper in the universe!",
    version="0.0.1",
    contact={
        "name": "Andrej Vasilj",
        "email": "andrej_vasilj@hotmail.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

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

@app.get('/', include_in_schema=False)
@app.get('/api/')
def health_check():
    return True

@app.get("/search/", include_in_schema=False)
@app.get("/api/search/", summary='The main search operation!')
async def search(query_string: str, start_index: Optional[int] = 0):
    url = f'{GOOGLE_URL}?q={query_string}&startIndex={start_index}&key={API_KEY}'
    async with AsyncClient() as client:
        try:
            r = await client.get(url)
            data = r.json()
        # Exceptions here were mainly for unit testing, but it's good to catch them anyway just in case
        except JSONDecodeError as e:
            raise HTTPException(status_code=400, detail='Cannot decode empty/invalid JSON')
        except TimeoutException as e:
            raise HTTPException(status_code=400, detail=str(e))

    if 'error' in data:
        raise HTTPException(status_code=data['error']['code'], detail=data['error']['message'])
    print(data['totalItems'])
    return data
