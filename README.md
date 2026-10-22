# Midnight — 24/7 Support & Managed Cloud Site

Full-stack MERN rebuild of a 24/7 support and DevOps agency website — MongoDB with Mongoose models, an Express JSON API, and a React (Vite) single-page front end. Working contact and newsletter forms, an admin inbox, and a nine-platform support section, all on a dark cyan-on-ink responsive skin.

## Run it

Requires Docker (or any reachable MongoDB) and Node 18+.

```bash
npm install
npm run db:start   # mongo:7 container on 127.0.0.1:27017
cp .env.example .env
npm run seed       # load content data into MongoDB
npm run dev        # API on :4000, React dev server on :5173
```

For a production-style run, build the client once and let Express serve it:

```bash
npm run build
npm start          # http://localhost:4000
```

The API reads `MONGODB_URI` (default `mongodb://127.0.0.1:27017/midnight`) and `PORT` (default `4000`) from `.env`.

## What's in it

| Area | Detail |
| --- | --- |
| Pages | Home, 24/7 Support, Cloud & DevOps, Platforms hub + 9 platform detail pages, Case Studies hub + 4 detail pages, Insights index with tag filtering + 6 articles, About, Contact, Admin inbox, 404 |
| Consistency | One `Header`, `Footer` and `LatestInsights` component shared across routes, so structure doesn't drift between pages |
| Forms | Contact and newsletter validate client-side, `POST` to the API, and validate again server-side before writing to Mongo. Invalid input shows the site's own message, not a browser bubble |
| Admin | `/admin` lists stored messages and subscribers from Mongo and deletes entries through the API |
| Content | Articles, case studies, platforms, packages, team and stats are seeded into MongoDB collections and read through the API |
| Responsive | Same structural and skin stylesheets as the previous build, unchanged; `skin.css` loads after `style.css` |
| Accessibility | Native `<details>` accordions, `aria-expanded` menus, labelled forms and landmarks |

## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness plus the URI in use |
| `GET` | `/api/articles` | All articles; `?tag=` filters by topic |
| `GET` | `/api/articles/latest` | First three, for the shared "Latest Insights" block |
| `GET` | `/api/articles/tags` | Distinct tag list for the filter chips |
| `GET` | `/api/articles/:slug` | One article with `prev` / `next` |
| `GET` | `/api/case-studies` · `/:slug` | Case studies; detail adds up to three `others` |
| `GET` | `/api/platforms` · `/:slug` | Platforms; detail adds up to four `otherPlatforms` |
| `GET` | `/api/packages` · `/api/team` · `/api/stats` | Pricing tiers, team members, headline stats |
| `POST` | `/api/contact` | Store a message — requires `name`, `email`, `message` |
| `POST` | `/api/newsletter` | Store a subscriber email, deduplicated by unique index |
| `GET` | `/api/messages` · `/api/subscribers` | Newest-first inbox lists |
| `DELETE` | `/api/messages/:id` | Remove a message (unknown or malformed id → `404`) |
| `*` | `/api/*` | `404` JSON for unknown API paths |

All responses are `{ ok: true }` or `{ ok: false, error }`.

## Layout

```
server/
  index.js             Express app, API mount, static client, DB connect
  src/db.js            Mongoose connection
  src/models/          Article, CaseStudy, Platform, SupportPackage, TeamMember, Stat, Message, Subscriber
  src/routes/          content.js (reads), forms.js (writes + inbox)
  src/data/content.js  seed content
  src/seed.js          npm run seed — clears and repopulates content collections
client/
  index.html           fonts, favicon, React root
  vite.config.js       dev server + /api proxy to :4000
  src/App.jsx          routes, scroll + hash handling, reveal observer
  src/pages/           one component per page type
  src/components/      Header, Footer, Forms, Cards, StatsStrip, LatestInsights
  src/lib/             api fetch hooks, reveal/title hooks
  src/styles/          style.css (structure + tokens), skin.css (dark theme override)
.env                   MONGODB_URI, PORT (gitignored)
_ref/                  original design references
```

`npm run seed` is idempotent: it wipes the six content collections and repopulates them from `server/src/data/content.js`. Messages and subscribers are never touched by seeding.

## Design notes

The theme is a dark "cloud support redesign" skin: ink `#0a0e17`, panel `#181b25`, cyan `#00f0ff`, mint `#00cc88`, Space Grotesk headings over Inter body. `skin.css` loads after `style.css` and only restates colour, border and shadow, so the structural stylesheet stays untouched and the skin can be dropped or swapped whole.

Illustrations are hand-drawn inline SVG — no image assets, no icon library.

## Known limits

- `/admin` has no authentication. It is a demo inbox, not a back office.
- Routes render client-side, so page HTML is not in the server response for crawlers or no-JS visitors.
- Content is seeded from a JS module rather than edited in a CMS; changing copy means editing `server/src/data/content.js` and re-running the seed.
- Company names, client logos, people and article copy are fictional paraphrase written for this build, not scraped from any live site.
