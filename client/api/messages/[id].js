import { del, BlobNotFoundError } from "@vercel/blob";

/* Ids are client-generated UUIDs that name a blob, so anything that could
   escape the messages/ prefix is rejected outright. */
const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function DELETE(request, { params }) {
  const { id } = params || {};
  if (!id || !ID_RE.test(id)) {
    return Response.json({ ok: false, error: "Message not found." }, { status: 404 });
  }
  try {
    await del(`messages/${id}.json`);
  } catch (err) {
    if (err instanceof BlobNotFoundError) {
      return Response.json({ ok: false, error: "Message not found." }, { status: 404 });
    }
    throw err;
  }
  return Response.json({ ok: true });
}
