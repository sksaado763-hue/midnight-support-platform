import { head, put, BlobNotFoundError } from "@vercel/blob";
import { createHash } from "node:crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = (body || {}).email;
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
  }
  /* One blob per address, keyed on the lowercased email: a repeat signup
     overwrites the same key instead of stacking duplicates. */
  const key = createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
  const pathname = `subscribers/${key}.json`;
  try {
    await head(pathname);
    return Response.json({ ok: true, duplicate: true });
  } catch (err) {
    if (!(err instanceof BlobNotFoundError)) throw err;
  }
  await put(pathname, JSON.stringify({ email: email.trim(), createdAt: new Date().toISOString() }), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
  return Response.json({ ok: true }, { status: 201 });
}
