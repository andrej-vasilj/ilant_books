import responses
from .main import app, API_KEY, GOOGLE_URL
from fastapi.testclient import TestClient

client = TestClient(app)

@responses.activate  
def test_search():
	responses.add(**{
      'method'         : responses.GET,
      'url'            : f'{GOOGLE_URL}?q=stuff&startIndex=0&key={API_KEY}',
      'body'           : '{"msg": "Mock response message"}',
      'status'         : 200,
      'content_type'   : 'application/json',
    })
	response = client.get("/search/?query_string=stuff")
	assert response.status_code == 200
	assert response.json() == {"msg": "Mock response message"}