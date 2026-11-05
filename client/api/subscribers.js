import { list, get } from "@vercel/blob";

export async function GET() {
  const { blobs } = await list({ prefix: "subscribers/" });
  const subscribers = await Promise.all(
    blobs.map(async (b) => {
      const result = await get(b.pathname, { access: "private" });
      return result ? JSON.parse(await new Response(result.stream).text()) : null;
    }),
  );
  const found = subscribers.filter(Boolean);
  found.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  return Response.json(found);
}
