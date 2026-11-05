import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bad = (error, status) => Response.json({ ok: false, error }, { status });

/* Named HTTP-method exports are what make this the web-standard signature;
   a default export is read as the legacy (req, res) handler and never gets a
   Request object. Mirrors server/src/routes/forms.js so the client sees the
   same validation and response shapes it was written against. */
export async function POST(request) {
  const body = await request.json().catch(() => null);
  const { name, email, phone, company, source, topic, timezone, message } = body || {};
  if (!name || !email || !message) {
    return bad("Name, email and message are required.", 400);
  }
  if (!EMAIL_RE.test(email)) {
    return bad("Please provide a valid email address.", 400);
  }
  const id = randomUUID();
  const record = {
    id,
    name,
    email,
    phone: phone || "",
    company: company || "",
    source: source || "",
    topic: topic || "",
    timezone: timezone || "",
    message,
    createdAt: new Date().toISOString(),
  };
  await put(`messages/${id}.json`, JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
  return Response.json({ ok: true, id }, { status: 201 });
}
