# Persona AI — Persona-Based Chatbot

A chatbot that lets you have real conversations with three Scaler personalities — Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. Each persona has its own system prompt, communication style, and quick-start chips.

Built with FastAPI + React + Gemini API.

**Live demo:** `[link here after deployment]`

---

## Stack

- **Frontend** — React + Vite, GSAP for animations
- **Backend** — Python, FastAPI
- **AI** — Google Gemini 2.5 Flash Lite (`google-genai` SDK)

---

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd PersonaBased
```

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
```

Create a `.env` file (use `.env.example` as reference):
```
GEMINI_API_KEY=your_key_here
```

Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey) — free, no card needed.

Start the server:
```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Features

- Persona switcher with animated tab transitions
- Conversation resets on persona switch
- Suggestion chips per persona
- Typing indicator
- API error handling
- Responsive layout

---

## Screenshots

`[add after deployment]`

---

## Notes

- Never commit your `.env` file — it's in `.gitignore`
- The `.env.example` file shows what variables are needed
- Backend runs on port `8000`, frontend on `5173`
