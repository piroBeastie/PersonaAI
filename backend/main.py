import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from personas import PERSONAS

load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

app = FastAPI()

# Allow React dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request / response shapes — FastAPI validates these automatically
class Message(BaseModel):
    role: str     # "user" or "model"
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
async def chat(request: ChatRequest):
    if request.persona_id not in PERSONAS:
        raise HTTPException(status_code=400, detail=f"Unknown persona: {request.persona_id}")

    persona = PERSONAS[request.persona_id]

    # Convert message history to Gemini's format
    history = [
        types.Content(role=msg.role, parts=[types.Part(text=msg.content)])
        for msg in request.messages
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
