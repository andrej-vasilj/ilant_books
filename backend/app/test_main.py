import pytest
from httpx import AsyncClient
from .main import app, API_KEY, GOOGLE_URL


@pytest.mark.asyncio
async def test_search(httpx_mock):
    # Stub out the downstream call to Google API
    url = f'{GOOGLE_URL}?q=stuff&startIndex=0&key={API_KEY}'
    payload = {'totalItems': 100}
    httpx_mock.add_response(url, json=payload)

    # Call our search API
    async with AsyncClient(app=app) as client:
        response = await client.get("https://localhost/api/search/?query_string=stuff&start_index=0")

    # Ensure we get back what we expect
    assert response.status_code == 200
    assert response.json() == payload
