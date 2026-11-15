import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Server side of the Capture Note Assistant demo (/Capture Note Assistant/).
 * The browser sends the transcript and a mode; the prompt is built here and the DeepSeek key
 * stays on the server (DEEPSEEK_API_KEY on Vercel). Without a key the demo falls back to the raw transcript.
 */
const MAX_CHARS = 20_000;

const SYSTEM = "You are a helpful assistant specialized in creating structured summaries of meetings and lectures.";

const PROMPTS = {
  meeting: (t: string) => `Create structured meeting minutes from the following transcript. Include:
- **Agenda/Topic:** Summarize the main topic of the meeting.
- **Key Decisions & Action Items:** Extract and list key decisions made and action items agreed upon, using bullet points.
- **Main Discussion Points:** Summarize the key points of discussion, using bullet points.

Transcript:
${t}`,
  lecture: (t: string) => `Restructure the following lecture transcript into structured lecture notes. Include:
- **Main Topic:** Identify and state the main topic of the lecture.
- **Subtopics:** Break down the lecture into logical subtopics, using headings for each subtopic.
- **Key Points under each subtopic:** For each subtopic, list the key learning points and details in bullet points.

Transcript:
${t}`,
} as const;

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  // Only the demo on this site may call this route.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let sameSite = false;
  try {
    sameSite = Boolean(origin && host && new URL(origin).host === host);
  } catch {
    sameSite = false;
  }
  if (!sameSite) return json({ error: "Forbidden" }, 403);

  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return json({ error: "AI formatting is not configured." }, 503);

  let body: { text?: unknown; mode?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  const mode = body.mode === "meeting" || body.mode === "lecture" ? body.mode : null;
  if (!text || !mode) return json({ error: "Send a transcript and a mode." }, 422);
  if (text.length > MAX_CHARS) return json({ error: "Transcript is too long." }, 413);

  try {
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 2000,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: PROMPTS[mode](text) },
        ],
      }),
      signal: AbortSignal.timeout(45_000),
    });
    if (!res.ok) throw new Error(`DeepSeek responded with ${res.status}`);
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error("Empty response");
    // Same shape the demo already reads.
    return json({ choices: [{ message: { content } }] });
  } catch (error) {
    console.error("[format-notes]", error);
    return json({ error: "Formatting failed." }, 502);
  }
}
