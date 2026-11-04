import { list, get } from "@vercel/blob";

export default async function GET() {
  const { blobs } = await list({ prefix: "messages/" });
  const messages = await Promise.all(
    blobs.map((b) => get(b.pathname).then((text) => JSON.parse(text))),
  );
  messages.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  return Response.json(messages);
}
