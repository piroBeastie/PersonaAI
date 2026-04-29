import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from personas import PERSONAS

load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

# Rate limiter — keyed by the requester's IP address
limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Same-origin on Vercel (no CORS needed), but kept for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    persona_id: str
    messages: List[Message]

class ChatResponse(BaseModel):
    response: str


@app.get("/")
def root():
    return {"status": "Persona AI API is running"}


@app.get("/personas")
def get_personas():
    return {
        pid: {
            "name": data["name"],
            "title": data["title"],
            "chips": data["chips"]
        }
        for pid, data in PERSONAS.items()
    }


@app.post("/chat", response_model=ChatResponse)
@limiter.limit("15/minute")  # max 15 messages per minute per IP
async def chat(request: Request, body: ChatRequest):
    if body.persona_id not in PERSONAS:
        raise HTTPException(status_code=400, detail=f"Unknown persona: {body.persona_id}")

    persona = PERSONAS[body.persona_id]

    history = [
        types.Content(role=msg.role, parts=[types.Part(text=msg.content)])
        for msg in body.messages
    ]

    try:
        result = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            config=types.GenerateContentConfig(
                system_instruction=persona["system_prompt"],
            ),
            contents=history,
        )
        return ChatResponse(response=result.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")
