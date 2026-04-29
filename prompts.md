# prompts.md — System Prompt Annotations

All three system prompts live in `backend/personas.py`. This doc explains what's in each one and why each decision was made.

---

## How the prompts are structured

Every prompt follows this skeleton:

1. **Grounding section** — real background (college, company, achievements). This is the GIGO layer — garbage in here means the model plays a generic "helpful mentor" instead of this specific person.
2. **Who You Are** — values, worldview, what they care about. Not just facts, but how they think.
3. **Communication Style** — sentence length, use of analogies, how they open and close responses.
4. **Chain-of-Thought instruction** — tells the model to reason internally before responding. Produces more considered, less generic answers.
5. **Few-shot examples** — 3 real Q&A pairs written in the persona's voice. This does more work than the description.
6. **Output instructions** — length, format, what to always end with.
7. **Constraints** — what the persona never does. Negative space matters a lot.

---

## Persona 1 — Anshuman Singh

**Background used:** IIIT Hyderabad, built Facebook Chat & Messenger, ACM ICPC World Finalist 2009 & 2010 (Stockholm + Harbin), published "The Gap in Technical Interview Preparation".

**Why these few-shot examples:** The three examples cover the most common things people ask a technical founder — why am I failing interviews, does my college matter, and where do I start with system design. These are the exact questions where a generic answer fails hardest. The examples model his directness: he names the actual mistake first, then fixes it.

**Why the CoT instruction:** Without it, the model jumps to encouragement before diagnosing. Anshuman diagnoses first. The CoT forces the model to ask "what's the actual mistake here" before responding.

**Why the constraints:** The biggest failure mode for this persona is motivational fluff. "You've got this!" is not an Anshuman response. The constraint makes that explicit.

**Communication style note:** Short sentences, no corporate words, always ends with something actionable. The `no em-dashes` rule came from noticing the model over-uses them when mimicking a direct voice.

---

## Persona 2 — Abhimanyu Saxena

**Background used:** IIIT Hyderabad, ex-Facebook, co-founder of Scaler, mission of "one million technology builders in India", published ESOPs guide and top performer guide.

**Why these few-shot examples:** Abhimanyu's domain is the career layer above pure coding — negotiation, resumes, community. These are topics most CS resources ignore. The examples show him acknowledging the emotional layer first ("the fact that you're even thinking about this puts you ahead") before going practical. That pattern is deliberate.

**Why the CoT instruction:** His answers need to land emotionally before they land practically. The CoT prompts him to assess "what's the emotional state here" first. Without it, the model skips straight to bullet-pointed advice which doesn't sound like him.

**Why the constraints:** His failure mode is being too generic — "just work hard" level advice. The constraint "never give advice that applies to everyone" directly targets that.

**Communication style note:** Uses "you" frequently, personal and direct. Ends with either a question or a clear next step — never just closes.

---

## Persona 3 — Kshitij Mishra

**Background used:** IIIT Hyderabad 2009–2014, published NLP research at COLING 2014, Appaton 2014 hackathon winner, Scaler instructor known for making hard topics click.

**Why these few-shot examples:** DP, graphs, recursion — the three topics that trip up the most people. Each example follows the same structure: analogy first, formal concept second, worked example third, challenge at the end. That structure is baked into every example so the model learns the pattern, not just the content.

**Why the CoT instruction:** Teaching requires picking the right entry point. The CoT forces the model to find the best analogy before writing the explanation, rather than starting with a definition.

**Why the constraints:** His biggest failure mode is starting with "Dynamic programming is an optimization technique where..." — that's the textbook, not Kshitij. The constraint "never give a definition without grounding it in an analogy first" fixes that.

**Communication style note:** Enthusiastic but not over the top. The `not on every sentence` note in output instructions exists because the model will write "Great question! Amazing! Wonderful!" on every line if you don't pull it back.
