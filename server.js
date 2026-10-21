const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const DB = {
  messages: path.join(DATA_DIR, "messages.json"),
  subscribers: path.join(DATA_DIR, "subscribers.json"),
};

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2));
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.locals.year = new Date().getFullYear();
app.locals.navActive = "";

/* ---------- Content data ---------- */
const articles = [
  {
    slug: "employee-spotlight-angela",
    title: "From night-shift bridge calls to leading the team",
    tag: "Employee Spotlight",
    tagClass: "tag-purple",
    date: "2026-09-12",
    dateLabel: "12th Sep 2026",
    excerpt: "How one of our engineers found her path from on-call rotations to running the show — and what she learned along the way.",
    theme: "spotlight",
    body: [
      "When Angela joined our night shift three years ago, she was the newest voice on the incident bridge. Today she runs it. Her path from on-call engineer to incident commander is the kind of story we love telling, because it says something about how support work should grow people rather than burn them out.",
      "\"The first few months were intimidating,\" she admits. \"You're the person who picks up the phone when a checkout flow breaks at 3am, and everyone's looking at you for a plan.\" What made the difference, she says, was structure: clear escalation paths, honest post-incident reviews, and a team that treated every page as a learning opportunity rather than a blame exercise.",
      "These days Angela spends her days shaping how the team responds — refining runbooks, mentoring newer engineers, and pushing for observability improvements that stop incidents before they start. \"The best incident is the one that never pages you,\" she says. \"The second best is one where the runbook does 80% of the thinking for you.\"",
      "Her advice for anyone starting in support engineering: keep notes on everything, ask questions early, and never be afraid to escalate. Escalating fast is a skill, not a failure.",
    ],
  },
  {
    slug: "keeping-incidents-small",
    title: "Keeping incidents small and the business running",
    tag: "Incident Management",
    tagClass: "tag-orange",
    date: "2026-08-30",
    dateLabel: "30th Aug 2026",
    excerpt: "A practical look at how structured incident response turns 3am pages into calm, coordinated fixes.",
    theme: "incident",
    body: [
      "Every team has a story about the incident that got away from them — what started as a slow database query snowballed into a full outage because nobody had a clear picture of who was doing what. Good incident management is the difference between that story and a boring one, and boring is exactly what you want at 3am.",
      "The foundation is role clarity. Someone owns communication, someone owns the technical investigation, and someone keeps the timeline. When those three hats sit on one head — or worse, on nobody's — incidents grow. On our bridges, the first five minutes are spent explicitly assigning roles, not fixing things.",
      "The second pillar is honest communication cadence. Stakeholders would rather hear \"we don't know yet, next update in 15 minutes\" than silence. We keep a strict update rhythm during any major incident, and it has saved more relationships with client teams than any technical fix ever has.",
      "Finally: the incident isn't over when the error rate drops. The post-incident review is where the real value lives. Blameless, thorough, and focused on contributing factors rather than people — that's how the same incident never happens twice.",
    ],
  },
  {
    slug: "seeing-clearly-across-your-system",
    title: "Seeing clearly across your whole system",
    tag: "Observability",
    tagClass: "tag-navy",
    date: "2026-08-14",
    dateLabel: "14th Aug 2026",
    excerpt: "We built a product that gives teams a single, honest picture of what's happening across their stack — here's why.",
    theme: "observability",
    body: [
      "Most teams don't suffer from a lack of data — they suffer from a lack of answers. Dashboards multiply, alerts pile up, and when something breaks, the first hour is spent figuring out which of forty graphs actually matters. That problem is why we built our own observability layer on top of the tooling we already ran.",
      "The philosophy is simple: an alert should be actionable, and a dashboard should answer a question. If an alert fires and the on-call engineer's first move is to open three other tools to figure out whether it matters, the alert is noise. Noise doesn't just waste time — it erodes trust in the whole system.",
      "We correlate infrastructure metrics, application traces, and recent deploys into a single timeline. When a client's platform hiccups, the on-call engineer sees the anomaly, the likely trigger, and the affected user journeys in one view. That turns a diagnosis from an investigation into a confirmation.",
      "Observability isn't a product you buy once — it's a discipline. But the right tooling makes the discipline possible, and that's the gap we set out to close.",
    ],
  },
  {
    slug: "cost-optimisation-without-regret",
    title: "Cutting cloud costs without cutting corners",
    tag: "Tech Guides",
    tagClass: "tag-purple",
    date: "2026-07-28",
    dateLabel: "28th Jul 2026",
    excerpt: "Right-sizing, reserved capacity and honest tagging hygiene: where the real cloud savings hide.",
    theme: "observability",
    body: [
      "The fastest way to cut a cloud bill is to turn things off. The second fastest — and far more sustainable — is to admit that most environments are oversized out of caution. We regularly find 30–40% of spend going to resources nobody can justify, usually provisioned for a launch that happened years ago.",
      "Right-sizing gets the headlines, but tagging hygiene is the unglamorous foundation. If you can't say which team owns which resource, you can't have the conversation about whether it should exist. Start with an ownership audit before touching a single instance.",
      "Reserved capacity and savings plans reward commitment, but commit wrong and you've locked in waste. Our rule of thumb: commit to the baseline you've observed for 90 days, not the peak you fear.",
      "The best cost optimisation leaves performance untouched and users none the wiser. If users notice, you optimised the wrong thing.",
    ],
  },
  {
    slug: "saas-oncall-rotation",
    title: "Designing an on-call rotation that humans survive",
    tag: "Site Reliability Engineering",
    tagClass: "tag-orange",
    date: "2026-07-02",
    dateLabel: "2nd Jul 2026",
    excerpt: "Sustainable rotations, sane escalation policies, and why follow-the-sun beats heroics every time.",
    theme: "incident",
    body: [
      "An on-call rotation designed around heroics is a resignation letter on a delay. Engineers will cover gaps for a quarter, maybe two, and then they leave — taking all their incident knowledge with them. Designing a rotation that humans can actually live inside is a reliability investment, not a perk.",
      "The basics matter most: never more than one week primary at a time, a genuine secondary who gets paged when things run long, and compensating time off after a rough night. If your rotation has no mechanism for acknowledging a bad week, you don't have a rotation — you have a slow burnout machine.",
      "Follow-the-sun changes everything when you can afford it. Handing an incident to a rested colleague in another timezone isn't a luxury; it's how you stop making 3am decisions that become 9am regrets. Even two timezones of coverage halves the pain.",
      "Finally, measure the rotation itself: pages per shift, pages per hour of the night, and how often incidents span handovers. Those numbers tell you whether the workload is humane long before your exit interviews do.",
    ],
  },
  {
    slug: "agency-support-partnership",
    title: "What agencies actually need from a support partner",
    tag: "Industry Commentary",
    tagClass: "tag-navy",
    date: "2026-06-18",
    dateLabel: "18th Jun 2026",
    excerpt: "White-label coverage, honest escalation and the end of the 6am Monday surprise.",
    theme: "spotlight",
    body: [
      "Agencies live and die by client trust, which is why the support conversation is so delicate. When a platform breaks, the client calls the agency — not the host, not the CMS vendor. What agencies need from a support partner is someone who makes that phone call easy.",
      "In practice that means three things. White-label communication, so updates carry the agency's voice. Genuine ownership, so \"we're looking into it\" is never the answer for more than a few minutes. And proactivity — catching degrading performance before the client's Monday morning dashboard does.",
      "The agencies we work with longest all share one trait: they treat support as part of the product they sell, not an unfortunate cost of doing business. Their renewal rates show it.",
      "Support done well is invisible. The site is simply, quietly, always up. That invisibility is the whole point — and the hardest thing to sell until you've experienced a week without it.",
    ],
  },
];

const caseStudies = [
  {
    slug: "absolute-software",
    client: "Absolute Software",
    industry: "SaaS",
    headline: "24/7 coverage for a global endpoint platform",
    challenge: "A fast-growing SaaS platform needed round-the-clock coverage across two continents without doubling headcount, and their incident response times were drifting as the product scaled.",
    approach: [
      "Mapped the full service catalogue and instrumented every user-facing journey with actionable alerts.",
      "Set up a follow-the-sun rotation pairing our EU and support pods with their in-house escalation engineers.",
      "Introduced blameless post-incident reviews that fed directly into their engineering backlog.",
    ],
    outcomes: ["82% reduction in out-of-hours escalation to client engineers", "Median incident acknowledgement under 4 minutes, around the clock", "Measurable drop in repeat incidents quarter over quarter"],
    theme: "spotlight",
  },
  {
    slug: "paylocity",
    client: "Paylocity",
    industry: "Fintech / HR",
    headline: "Hardened payroll infrastructure for peak windows",
    challenge: "Payroll runs are unforgiving: massive scheduled bursts of load, zero tolerance for missed deadlines, and a compliance environment that punishes surprises.",
    approach: [
      "Rebuilt the deployment pipeline with automated rollback and progressive delivery for payroll services.",
      "Load-tested every release against simulated peak windows before it could reach production.",
      "Implemented pre-run health checks that block a payroll cycle from starting on a degraded cluster.",
    ],
    outcomes: ["Zero missed payroll windows across 14 months", "Release confidence high enough to deploy during business hours", "Pre-run checks catching degradation before every major cycle"],
    theme: "observability",
  },
  {
    slug: "structureflow",
    client: "StructureFlow",
    industry: "LegalTech",
    headline: "Managed cloud migration with zero downtime",
    challenge: "A legal workflow platform on ageing infrastructure needed to move to managed cloud without a maintenance window their clients would accept.",
    approach: [
      "Ran a well-architected review and rebuilt the environment as infrastructure-as-code.",
      "Migrated in waves behind traffic switching, with instant rollback paths at every step.",
      "Left behind runbooks and architecture documentation the internal team actually uses.",
    ],
    outcomes: ["Migration completed with zero customer-visible downtime", "Infrastructure costs down 35% after right-sizing", "Environment rebuild time cut from days to under an hour"],
    theme: "incident",
  },
  {
    slug: "the-body-coach-app",
    client: "The Body Coach App",
    industry: "Health & Fitness",
    headline: "Keeping a consumer app stable through demand spikes",
    challenge: "TV appearances and campaign launches sent sign-ups through the roof, regularly overwhelming the app's backend and frustrating exactly the users the campaigns were built to attract.",
    approach: [
      "Introduced autoscaling policies tuned to the app's real traffic signature, not generic CPU triggers.",
      "Added queueing and back-pressure to smooth bursty write traffic during sign-up storms.",
      "Established launch-day war rooms for major campaigns, with capacity pre-tested in staging.",
    ],
    outcomes: ["Campaign days handled without manual intervention", "Sign-up conversion during spikes recovered to baseline", "War-room model adopted for every major launch since"],
    theme: "spotlight",
  },
];

const packages = [
  {
    name: "Essentials",
    price: "£1,450",
    period: "/ month",
    tagline: "Out-of-hours cover for platforms that mostly behave.",
    features: [
      "24/7 monitoring & alerting",
      "Business-hours engineering response",
      "Out-of-hours critical response (30 min)",
      "Monthly uptime & incident reporting",
      "Email & ticket support",
    ],
    cta: "Start with Essentials",
    featured: false,
  },
  {
    name: "Growth",
    price: "£3,200",
    period: "/ month",
    tagline: "Round-the-clock response for revenue-critical platforms.",
    features: [
      "Everything in Essentials",
      "24/7 engineering response (15 min critical)",
      "Infrastructure patching & maintenance windows",
      "Cost & performance reviews each quarter",
      "Named account engineer",
      "Slack Connect support channel",
    ],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "A dedicated pod for complex, regulated estates.",
    features: [
      "Everything in Growth",
      "Dedicated support pod & follow-the-sun rotation",
      "Custom SLAs & compliance alignment (ISO, SOC 2)",
      "Disaster recovery planning & testing",
      "Quarterly architecture reviews",
      "White-label communication for agencies",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

const team = [
  { name: "Priya Nair", role: "Founder & CEO", initials: "PN", tint: "amber" },
  { name: "Tom Whitfield", role: "Head of Support", initials: "TW", tint: "purple" },
  { name: "Angela Osei", role: "Incident Commander", initials: "AO", tint: "navy" },
  { name: "Marco Bianchi", role: "Principal Cloud Architect", initials: "MB", tint: "amber" },
  { name: "Sofia Lindqvist", role: "Observability Lead", initials: "SL", tint: "purple" },
  { name: "Daniel Okafor", role: "DevOps Practice Lead", initials: "DO", tint: "navy" },
];

const stats = [
  { value: "24/7/365", label: "Coverage, no exceptions" },
  { value: "< 4 min", label: "Median response, day or night" },
  { value: "98.6%", label: "Issues resolved before clients notice" },
  { value: "40+", label: "Platforms under our care" },
];

const sharedPlatformFeatures = [
  { title: "We follow the sun", text: "Follow-the-sun rotations mean your platform is watched by a rested engineer at every hour — nobody carries the night alone." },
  { title: "We're full-stack", text: "Application, infrastructure, DNS, CDN, integrations — if it touches your platform, it's on our radar." },
  { title: "We're proactive about performance", text: "We catch degrading trends and fix them before your users notice, instead of waiting for the alarm." },
  { title: "We're tech-enabled; person-led", text: "Best-in-class monitoring does the watching, but a human who knows your estate makes the calls." },
];

const platforms = [
  {
    slug: "sitecore",
    name: "Sitecore",
    short: "SC",
    tint: "amber",
    tagline: "24/7 support, hosting and consulting for Sitecore estates",
    intro: "Sitecore often sits at the very heart of a digital estate — which makes it exactly the kind of platform that deserves genuine, eyes-on support rather than a ticket queue.",
    problem: "When Sitecore degrades, everything downstream feels it: personalisation breaks, campaigns stall, and your team ends up firefighting instead of shipping. Deep Sitecore knowledge combined with real infrastructure experience is a rare pairing — and hard to hire.",
    solution: "Our engineers work across the Sitecore application and the cloud it runs on, as one system. We monitor user journeys, manage upgrades and patches in maintenance windows that suit you, and keep your experience platform delivering — 24 hours a day.",
    features: [
      { title: "Sitecore specialists", text: "Certified engineers who know Content Hub, Experience Edge and the whole SIAH stack — not just the hosting underneath it." },
      { title: "End-to-end incident management", text: "From first alert to post-incident review, one team owns the incident — no handoffs into the void." },
    ],
    faqs: [
      { q: "Which Sitecore versions do you support?", a: "We support Sitecore installations from 8.x through the latest XM Cloud and Content Hub deployments, including hybrid estates during upgrade projects." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps between 'the app team' and 'the cloud team'." },
      { q: "How does it work?", a: "We start with an onboarding audit of your estate, wire it into our monitoring, agree escalation paths, then take over the 24/7 watch — usually within two weeks." },
    ],
  },
  {
    slug: "kentico",
    name: "Kentico",
    short: "KE",
    tint: "purple",
    tagline: "Managed cloud and 24/7 support for Kentico platforms",
    intro: "Kentico is a leading mid-market content and marketing platform — powerful, but demanding real operational care once it's carrying a business.",
    problem: "Kentico projects tend to grow organically: features accrete, licenses renew, and eventually nobody's quite sure what's safe to touch. When something breaks at the weekend, there's no map and no cover.",
    solution: "We document, monitor and look after your Kentico estate as if it were ours — from Xperience upgrades to portal performance — with round-the-clock response and a team that already knows your instance before anything goes wrong.",
    features: [
      { title: "Kentico specialists", text: "Hands-on experience with Xperience by Kentico and the classic portal engine, plus the Azure estates they typically run on." },
      { title: "Upgrade and license hygiene", text: "We track versions, hotfixes and license renewals so nothing lapses quietly in the background." },
    ],
    faqs: [
      { q: "Do you support Xperience by Kentico as well as older versions?", a: "Yes — both the newer Xperience platform and classic Kentico installations, including migrations between them." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
  {
    slug: "umbraco",
    name: "Umbraco",
    short: "UM",
    tint: "navy",
    tagline: "Managed cloud and 24/7 eyes-on support for Umbraco",
    intro: "Umbraco is the friendly open-source CMS that often becomes the focal point of a customer's digital presence — and the friendliest CMS still deserves serious cover.",
    problem: "Umbraco's flexibility means every install is unique. Generic host support knows the infrastructure but not your build; your dev team knows the build but isn't awake at 3am. That gap is where outages live.",
    solution: "As partners of both Umbraco and Microsoft Azure, we support your CMS and its cloud as a single system — patching, performance tuning, uptime and incident response, all under one roof.",
    features: [
      { title: "Umbraco + Azure, together", text: "Official partnerships on both sides mean direct escalation paths when either layer misbehaves." },
      { title: "Deploy and content-flow safety", text: "We watch your CI/CD pipeline and content cache health, so editor teams never lose work mid-publish." },
    ],
    faqs: [
      { q: "Can you host Umbraco as well as support it?", a: "Yes — we run managed Umbraco environments on Azure, or support an installation hosted wherever it already lives." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
  {
    slug: "aem",
    name: "Adobe Experience Manager (AEM)",
    short: "AE",
    tint: "amber",
    tagline: "Managed services and 24/7 support for AEM estates",
    intro: "AEM is an enterprise-grade experience platform — cross-channel content, personalisation, and a sizeable operational footprint that quietly demands a specialist team.",
    problem: "AEM estates are large, integrated and business-critical. When authoring slows or a publish queue backs up, marketing campaigns and entire product launches are affected — and AEM expertise is scarce and expensive to keep in-house.",
    solution: "We provide managed cloud services and 24/7 eyes-on support for AEM, watching author instances, publish farms and dispatchers as one estate and intervening before small issues become launch-day problems.",
    features: [
      { title: "AEM operational depth", text: "Author/publish topologies, dispatcher rules, oak repository health and index maintenance — handled by people who've done it at scale." },
      { title: "Release-window cover", text: "Campaign launches and major publishes get pre-checked environments and war-room coverage on the day." },
    ],
    faqs: [
      { q: "Do you cover AEM as a Cloud Service or only self-hosted?", a: "Both — Managed Services and AEM as a Cloud Service estates, including the integrations and dispatchers around them." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
  {
    slug: "magento",
    name: "Magento (Adobe Commerce)",
    short: "MG",
    tint: "purple",
    tagline: "Managed hosting and round-the-clock support for Magento",
    intro: "Magento is an agile commerce platform with serious marketing firepower — and a checkout that cannot, under any circumstances, be allowed to have a bad night.",
    problem: "For a Magento store, downtime is counted in abandoned baskets and lost revenue, minute by minute. Peak trading multiplies the stakes, and plugin sprawl adds fragile moving parts nobody fully owns.",
    solution: "We run and watch your Magento estate end to end — checkout flows, payment gateways, catalogue performance — with pre-peak load testing and war-room coverage when your biggest trading days arrive.",
    features: [
      { title: "Commerce-grade monitoring", text: "Alerts tied to basket and checkout journeys, not just server metrics — because revenue is the metric that matters." },
      { title: "Peak-season readiness", text: "Pre-peak load tests, capacity plans and launch-day war rooms for Black Friday and every campaign after it." },
    ],
    faqs: [
      { q: "Do you support Magento Open Source as well as Adobe Commerce?", a: "Yes — both Adobe Commerce and Magento Open Source, including headless and Hyvä front-ends." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
  {
    slug: "optimizely",
    name: "Optimizely",
    short: "OP",
    tint: "navy",
    tagline: "Managed cloud and 24/7 support for Optimizely",
    intro: "Optimizely blends content management with commerce and experimentation — a powerful combination that needs to be 'always on' for the brands running on it.",
    problem: "Experimentation platforms live and die by trust: if the marketing team suspects a test is misfiring or the CMS is slow, the whole programme stalls while engineers investigate from scratch.",
    solution: "Our engineers keep Optimizely platforms healthy — content, commerce and experimentation layers — so your team can trust the data, ship campaigns on schedule and never wonder whether the platform is the problem.",
    features: [
      { title: "Experimentation reliability", text: "We watch the runtime and integrations behind your tests, so a misbehaving snippet never quietly corrupts your results." },
      { title: "Faster feature delivery", text: "Release support and pipeline health checks that get your features to market without drama." },
    ],
    faqs: [
      { q: "Which Optimizely products do you cover?", a: "CMS, Commerce and the experimentation platform — individually or as a combined estate." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
  {
    slug: "wordpress",
    name: "WordPress",
    short: "WP",
    tint: "amber",
    tagline: "24/7 support, managed cloud and DevOps for WordPress",
    intro: "WordPress offers its users tremendous freedom — which is exactly why high-traffic, business-critical WordPress installs need more than a plugin that promises backups.",
    problem: "Popular, open and endlessly extensible, WordPress is also the most attacked platform on the internet. Plugin conflicts, update breakage and traffic spikes all conspire against the unattended site.",
    solution: "With our 24/7 support, managed cloud and DevOps offering you get the best of both worlds: an easy-to-use CMS your team already loves, wrapped in enterprise-grade cover — hardening, patching, monitoring and instant response.",
    features: [
      { title: "Hardened by default", text: "Security baseline, access hygiene and update discipline applied from day one — not after the first scare." },
      { title: "Scale-ready architecture", text: "Caching layers, CDNs and database tuning that keep editorial teams fast at any traffic level." },
    ],
    faqs: [
      { q: "Do you support headless WordPress setups?", a: "Yes — headless WP with any front-end, as well as classic themes and page-builder builds." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    short: "CF",
    tint: "purple",
    tagline: "Edge, DNS and CDN operations around the clock",
    intro: "Cloudflare sits in front of everything — DNS, CDN, WAF, workers — which makes it the highest-leverage layer to get right and the most painful to misconfigure.",
    problem: "A bad WAF rule can silently break checkout. A mis-scoped cache purge can leak the wrong content. Edge changes are fast, global and unforgiving — and usually made under time pressure.",
    solution: "We manage Cloudflare estates as part of the platforms they protect: change-controlled rulesets, monitored worker deployments, and 24/7 response when the edge misbehaves — so your team never debugs DNS at midnight.",
    features: [
      { title: "Change-controlled edge", text: "WAF rules, redirects and workers go through review — no more mystery breakage traced to a Friday rule edit." },
      { title: "Integrated with your platform support", text: "Edge, origin and application monitored as one system, because incidents never respect layer boundaries." },
    ],
    faqs: [
      { q: "Do you manage Cloudflare for platforms you don't host?", a: "Yes — we can manage your Cloudflare estate whether your origin sits with us, another provider or your own infrastructure." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
  {
    slug: "custom-applications",
    name: "Custom Applications",
    short: "CA",
    tint: "navy",
    tagline: "24/7 support for the software nobody else can spell",
    intro: "Bespoke applications have bespoke problems. There's no vendor to call and no forum post that matches — only the people who know the system, and too often they left years ago.",
    problem: "Custom builds carry bus-factor risk: the one engineer who understood the billing module is on holiday, the other has resigned, and the on-call rota is a spreadsheet of crossed fingers.",
    solution: "We become the team that knows your custom application inside out — onboarding documentation, runbooks, monitoring and 24/7 response — so your bespoke software finally has institutional cover instead of heroic individuals.",
    features: [
      { title: "Knowledge capture first", text: "We document what we learn during onboarding, so every incident makes the next one easier — and the bus factor shrinks." },
      { title: "Runbooks that work at 3am", text: "Sleep-deprived engineers need clear steps, not tribal knowledge. We write and maintain runbooks for every recurring scenario." },
    ],
    faqs: [
      { q: "We don't have proper documentation — is that a problem?", a: "No. Reverse-engineering undocumented systems is part of the job — the documentation we produce during onboarding becomes a deliverable you keep." },
      { q: "What is full-stack support?", a: "Cover across your application, its infrastructure and everything in between — one team, one escalation path, no gaps." },
      { q: "How does it work?", a: "Onboarding audit, monitoring wired in, escalation paths agreed — then we take the 24/7 watch, usually inside two weeks." },
    ],
  },
];

platforms.forEach(function (p) {
  p.features = p.features.concat(sharedPlatformFeatures);
});

app.locals.allPlatforms = platforms;
app.locals.latestArticles = articles.slice(0, 3);
articles[0].isNew = true;
articles[1].isNew = true;

/* ---------- Page routes ---------- */

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Just After Midnight | 24/7 Support, Managed Cloud & DevOps",
    navActive: "home",
    stats,
  });
});

app.get("/support", (req, res) => {
  res.render("pages/support", {
    title: "24/7 Support Packages | Just After Midnight",
    navActive: "support",
    packages,
    stats,
  });
});

app.get("/cloud", (req, res) => {
  res.render("pages/cloud", {
    title: "Managed Cloud & DevOps Services | Just After Midnight",
    navActive: "cloud",
  });
});

app.get("/platforms", (req, res) => {
  res.render("pages/platforms", {
    title: "Platforms We Support | Just After Midnight",
    navActive: "platforms",
  });
});

app.get("/platforms/:slug", (req, res) => {
  const platform = platforms.find((p) => p.slug === req.params.slug);
  if (!platform) return res.status(404).render("pages/404", { title: "Not Found", navActive: "" });
  res.render("pages/platform-detail", {
    title: `${platform.name} Support | Just After Midnight`,
    navActive: "platforms",
    platform,
    otherPlatforms: platforms.filter((p) => p.slug !== platform.slug).slice(0, 4),
  });
});

app.get("/case-studies", (req, res) => {
  res.render("pages/case-studies", {
    title: "Case Studies | Just After Midnight",
    navActive: "case-studies",
    caseStudies,
  });
});

app.get("/case-studies/:slug", (req, res) => {
  const study = caseStudies.find((s) => s.slug === req.params.slug);
  if (!study) return res.status(404).render("pages/404", { title: "Not Found", navActive: "" });
  res.render("pages/case-study-detail", {
    title: `${study.client} Case Study | Just After Midnight`,
    navActive: "case-studies",
    study,
    others: caseStudies.filter((s) => s.slug !== study.slug).slice(0, 3),
  });
});

app.get("/insights", (req, res) => {
  const tag = req.query.tag;
  const tags = [...new Set(articles.map((a) => a.tag))];
  const filtered = tag ? articles.filter((a) => a.tag === tag) : articles;
  res.render("pages/insights", {
    title: "Insights | Just After Midnight",
    navActive: "insights",
    articles: filtered,
    tags,
    activeTag: tag || null,
  });
});

app.get("/insights/:slug", (req, res) => {
  const article = articles.find((a) => a.slug === req.params.slug);
  if (!article) return res.status(404).render("pages/404", { title: "Not Found", navActive: "" });
  const idx = articles.indexOf(article);
  res.render("pages/article-detail", {
    title: `${article.title} | Just After Midnight`,
    navActive: "insights",
    article,
    prev: articles[idx - 1] || null,
    next: articles[idx + 1] || null,
  });
});

app.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About Us | Just After Midnight",
    navActive: "about",
    team,
    stats,
  });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact Us | Just After Midnight",
    navActive: "contact",
  });
});

app.get("/admin", (req, res) => {
  const messages = readJson(DB.messages, []);
  const subscribers = readJson(DB.subscribers, []);
  res.render("pages/admin", {
    title: "Admin Inbox | Just After Midnight",
    navActive: "",
    messages: messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    subscribers: subscribers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  });
});

/* ---------- API routes ---------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", (req, res) => {
  const { name, email, company, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Name, email and message are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
  }
  const messages = readJson(DB.messages, []);
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 160),
    company: String(company || "").slice(0, 120),
    message: String(message).slice(0, 3000),
    createdAt: new Date().toISOString(),
  };
  messages.push(entry);
  writeJson(DB.messages, messages);
  res.status(201).json({ ok: true, id: entry.id });
});

app.post("/api/newsletter", (req, res) => {
  const email = (req.body || {}).email;
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
  }
  const subscribers = readJson(DB.subscribers, []);
  if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ ok: true, duplicate: true });
  }
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    email: String(email).slice(0, 160),
    createdAt: new Date().toISOString(),
  };
  subscribers.push(entry);
  writeJson(DB.subscribers, subscribers);
  res.status(201).json({ ok: true });
});

app.delete("/api/messages/:id", (req, res) => {
  const messages = readJson(DB.messages, []);
  const next = messages.filter((m) => m.id !== req.params.id);
  if (next.length === messages.length) {
    return res.status(404).json({ ok: false, error: "Message not found." });
  }
  writeJson(DB.messages, next);
  res.json({ ok: true });
});

app.use("/api", (req, res) => {
  res.status(404).json({ ok: false, error: "Unknown API endpoint." });
});

app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Page Not Found", navActive: "" });
});

app.listen(PORT, () => {
  console.log(`Just After Midnight clone running at http://localhost:${PORT}`);
});
