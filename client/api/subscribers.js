import { list, get } from "@vercel/blob";

export default async function GET() {
  const { blobs } = await list({ prefix: "subscribers/" });
  const subscribers = await Promise.all(
    blobs.map((b) => get(b.pathname).then((text) => JSON.parse(text))),
  );
  subscribers.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  return Response.json(subscribers);
}
