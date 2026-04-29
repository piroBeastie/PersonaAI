# reflection.md

## What I Built

A persona-based chatbot where you can talk to Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra — three real people from Scaler. Each one has a separate system prompt, different suggestion chips, and its own color in the UI. Switching personas resets the conversation. Built on FastAPI + React + Gemini 2.5 Flash Lite.

---

## What Worked

The few-shot examples did more work than I expected. Once I wrote three Q&A pairs actually in a persona's voice — with their specific reasoning patterns, not just their topic area — the model started sounding like that person even on questions the examples didn't cover. The examples teach a pattern, not just a sample.

The chain-of-thought instruction made a real difference for Anshuman's persona specifically. Without it, the model would jump to "great question, here's what you should do" — which is exactly what Anshuman wouldn't say. Telling it to diagnose the mistake before responding changed the output noticeably.

Getting the factual grounding right also mattered more than I expected. The first version of the prompts had wrong facts — wrong college, wrong company. The model was hallucinating consistent with those wrong facts. Once I updated to the real background (IIIT Hyderabad, Facebook Messenger, actual ICPC years), the persona felt grounded rather than generic.

---

## What GIGO Taught Me

GIGO showed up in two places.

First, lazy persona descriptions produce lazy personas. My first Anshuman prompt said something like "you are technical, direct, and care about student outcomes." The output was indistinguishable from any generic helpful assistant — because that description applies to basically every AI assistant by default. The moment I added specifics — ICPC World Finalist, built Facebook Chat, published a specific article in 2015 — the model had something real to anchor to.

Second, vague output instructions produce vague output. "Be helpful and concise" means nothing. "4–7 sentences, end with a concrete action or a sharp question, no bullet points" is a constraint the model can actually follow. The more specific the instruction, the more predictable the output.

---

## What I'd Improve

The system prompts are long — each one is around 600–700 words. That's fine for quality but means every API call carries a large token overhead. I'd look at compressing the few-shot examples without losing the pattern they teach.

I'd also add conversation memory that persists across sessions, so if you come back and switch to Anshuman again you can pick up where you left off. Right now it resets on every page load.

The personas are approximations. They're built from LinkedIn profiles and public writing, which only shows a curated slice of who someone is. A better version of this would involve actual transcripts, interviews, or class recordings to get the real language patterns — the filler words, the pauses, the specific phrases they repeat.
