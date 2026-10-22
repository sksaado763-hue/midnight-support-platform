import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.API_BASE || "http://localhost:4000";
const clientDir = fileURLToPath(new URL("../client/", import.meta.url));
const outDir = path.join(clientDir, "public", "api");
const configFile = path.join(clientDir, "vercel.json");

async function get(pathname) {
  const res = await fetch(BASE + pathname);
  if (!res.ok) throw new Error(`${BASE}${pathname} responded ${res.status}`);
  return res.json();
}

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// request -> the path a visitor asks for, file -> where its body lands under public/api
const captures = [];
async function capture(request, file, has) {
  const body = await get(request);
  captures.push({ request, file, has, body });
  return body;
}

const articles = await capture("/api/articles", "articles");
const platforms = await capture("/api/platforms", "platforms");
const caseStudies = await capture("/api/case-studies", "case-studies");
await capture("/api/articles/tags", "articles/tags");
await capture("/api/articles/latest", "articles/latest");
await capture("/api/packages", "packages");
await capture("/api/team", "team");
await capture("/api/stats", "stats");

// Tag views are a query string; a static host cannot filter, so each tag gets its own file
// and a rewrite keyed on the query value. Ordered before the plain /api/articles rule.
const tags = await get("/api/articles/tags");
for (const tag of tags) {
  await capture(`/api/articles?tag=${encodeURIComponent(tag)}`, `articles/by-tag/${slugify(tag)}`, [
    { type: "query", key: "tag", value: tag },
  ]);
}

for (const article of articles) await capture(`/api/articles/${article.slug}`, `articles/${article.slug}`);
for (const platform of platforms) await capture(`/api/platforms/${platform.slug}`, `platforms/${platform.slug}`);
for (const study of caseStudies) await capture(`/api/case-studies/${study.slug}`, `case-studies/${study.slug}`);

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
let bytes = 0;
for (const { file, body } of captures) {
  const dest = path.join(outDir, `${file}.json`);
  await mkdir(path.dirname(dest), { recursive: true });
  const text = JSON.stringify(body);
  await writeFile(dest, text);
  bytes += Buffer.byteLength(text);
}

const toRule = ({ request, file, has }) => {
  const source = new URL(request, BASE).pathname;
  return has ? { source, has, destination: `/api/${file}.json` } : { source, destination: `/api/${file}.json` };
};
// Tagged requests have to be matched before the bare /api/articles rule, or they get the unfiltered list.
const rewrites = [...captures.filter((c) => c.has), ...captures.filter((c) => !c.has)].map(toRule);
// Deep links need index.html, but /api/* must 404 instead of answering with a page.
rewrites.push({ source: "/((?!api/).*)", destination: "/index.html" });

await writeFile(
  configFile,
  JSON.stringify(
    {
      $schema: "https://openapi.vercel.sh/vercel.json",
      framework: "vite",
      buildCommand: "npm run build",
      outputDirectory: "dist",
      rewrites,
    },
    null,
    2
  ) + "\n"
);

console.log(`${captures.length} endpoints -> client/public/api (${(bytes / 1024).toFixed(1)} kB), ${rewrites.length} rewrites -> client/vercel.json`);
