import { head, put } from "@vercel/blob";
import { createHash } from "node:crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = (body || {}).email;
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
  }
  /* One blob per address, keyed on the lowercased email: a repeat signup
     overwrites the same key instead of stacking duplicates. */
  const key = createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
  const existing = await head(`subscribers/${key}.json`);
  if (existing) return Response.json({ ok: true, duplicate: true });
  await put(`subscribers/${key}.json`, JSON.stringify({ email: email.trim(), createdAt: new Date().toISOString() }), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
  return Response.json({ ok: true }, { status: 201 });
}
