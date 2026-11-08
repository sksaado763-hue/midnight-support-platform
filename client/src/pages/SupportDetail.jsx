import { Fragment, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import CaseFeature from "../components/CaseFeature";
import CapabilityBand from "../components/CapabilityBand";
import CaseStudiesBand from "../components/CaseStudiesBand";
import FaqBand from "../components/FaqBand";
import OutcomeBand from "../components/OutcomeBand";
import PackageBand from "../components/PackageBand";
import ReviewsBand from "../components/ReviewsBand";
import WhyBand from "../components/WhyBand";
import NotFound from "./NotFound";

const PROVIDERS = [
  {
    slug: "aws-support",
    name: "AWS",
    title: "24/7 support for AWS",
    tagline: "The cluster, the queues, the lambdas and the bill — watched, patched and answered for, every hour of every day.",
    intro: "AWS rewards depth and punishes neglect. Most teams we meet run a competent estate that nobody has time to keep competent: images a year stale, roles wider than they need to be, a dashboard nobody opens. We take the whole thing onto our rota so your engineers stop being the on-call for infrastructure they inherited.",
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "Patching and runtime upgrades inside your approved window", "Backup verification and restore drills", "Certificate, domain and DNS expiry watch"] },
      { title: "Every month", items: ["Cost review with a written list of actions", "IAM and security-group drift review", "Capacity and scaling-policy check", "A plain-language report your finance team can read"] },
    ],
    coverage: {
      title: "The AWS work that happens while you sleep",
      intro: "Every line below is on the rota, with a named engineer and a written result. What changes between tiers is how fast we pick it up, not whether we pick it up.",
      groups: [
        { title: "Compute & containers", items: ["ECS and EKS service watches", "Lambda cold starts and error budgets", "EC2 fleet patching inside your window", "Autoscaling bounds reviewed weekly"] },
        { title: "Data & storage", items: ["RDS failover tested, not assumed", "DynamoDB capacity and hot partitions", "S3 lifecycle and versioning audits", "ElastiCache evictions and memory drift"] },
        { title: "Network & edge", items: ["Load-balancer target health checks", "CloudFront hit ratios and cache rules", "Certificate, DNS and Route 53 expiry", "VPC reachability and peering analysis"] },
        { title: "Identity & spend", items: ["IAM access reviews on a published rota", "Unused roles and keys removed", "Cost anomalies alerted with an owner", "Savings-plan coverage reported monthly"] },
        { title: "Incident & response", items: ["Severity grading and SLA clocks", "Bridge calls during major incidents", "AWS support cases opened and chased", "Post-incident write-ups with actions"] },
        { title: "Change & releases", items: ["Deployment watches through your window", "Rollback rehearsed every quarter", "Maintenance slots agreed in writing", "A change log your auditors can read"] },
      ],
      closer: {
        text: "Tell us which accounts hurt and we will take those first — the rest follows on the same rota.",
        cta: "Talk about your AWS estate",
        to: "/contact",
      },
    },
    fitWith: [
      "You run production on AWS with no dedicated platform team",
      "Your current cover ends at 18:00 and your users do not",
      "You inherited the estate and nobody current designed it",
      "You want one rota covering AWS and the application on top of it",
    ],
    faqs: [
      { q: "Do you need admin access on day one?", a: "No. We start read-only, write up what we find, and only take change access once you have approved the plan." },
      { q: "Can you work alongside our existing DevOps contractor?", a: "Yes. They keep the roadmap, we take the nights and the weekends, and the morning handover goes to both." },
      { q: "What if we are mostly serverless?", a: "Then the rota leans on Lambda, Step Functions and queue depth instead of fleets — same cover, different dials." },
    ],
  },
  {
    slug: "azure-support",
    name: "Azure",
    title: "24/7 support for Azure",
    tagline: "AKS, App Service, Functions and Entra — watched, patched and answered for, every hour of every day.",
    intro: "Azure estates tend to accrete: a subscription per project, an App Service plan per experiment, an Entra tenant nobody wants to own. We take the whole subscription group onto our rota so the estate stays legible and the alerts reach someone awake.",
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "Patch and runtime upgrades inside your approved window", "Backup verification and restore drills", "Certificate, domain and DNS expiry watch"] },
      { title: "Every month", items: ["Subscription and cost review with a delete list", "Entra role and service-principal drift review", "Quota and scaling-policy check", "A plain-language report your finance team can read"] },
    ],
    coverage: {
      title: "The Azure work that happens while you sleep",
      intro: "Subscriptions, tenants and the applications on top of them, handled by named engineers with a written handover at the end of every shift.",
      groups: [
        { title: "Compute & containers", items: ["AKS node pools patched in window", "App Service plans sized to traffic", "Functions scale-out limits watched", "Container apps and their quotas reviewed"] },
        { title: "Data & storage", items: ["Azure SQL query and index reviews", "Cosmos DB throughput and partition keys", "Blob lifecycle and immutability checks", "Redis memory and failover watches"] },
        { title: "Network & edge", items: ["Front Door health probes and routing", "Private endpoint reachability analysis", "VNet and NSG drift reviews", "Certificate and DNS expiry watch"] },
        { title: "Identity & spend", items: ["Entra access reviews on a rota", "Stale service principals removed", "Licence sprawl counted and cut", "Subscription spend reviewed monthly"] },
        { title: "Incident & response", items: ["Severity grading and SLA clocks", "Microsoft support cases chased", "Bridge calls during major incidents", "Post-incident write-ups with actions"] },
        { title: "Change & governance", items: ["Policy exceptions logged and owned", "Landing-zone and blueprint checks", "Release windows agreed in writing", "Backup and restore drills scheduled"] },
      ],
      closer: {
        text: "Send the subscriptions that matter and we will take those first — the rest follows on the same rota.",
        cta: "Talk about your Azure estate",
        to: "/contact",
      },
    },
    fitWith: [
      "You run production across several Azure subscriptions",
      "Your alerts currently land on a distribution list",
      "Compliance needs evidence of patching and backups, not promises",
      "You want one rota covering Azure and the application on top of it",
    ],
    faqs: [
      { q: "Do you work with our Microsoft partner?", a: "Happily. They keep the licence relationship and the roadmap; we keep the nights and the handover." },
      { q: "Can you take over a landing zone we did not build?", a: "Yes. We start read-only, map what exists against what the zone assumes, and write up the gaps before touching anything." },
      { q: "What about hybrid estates?", a: "ExpressRoute and VPN links into on-premises are on the cover too, as long as we can see the Azure side of the wire." },
    ],
  },
  {
    slug: "gcp-support",
    name: "GCP",
    title: "24/7 support for GCP",
    tagline: "GKE, Cloud Run, BigQuery and the projects around them — watched, patched and answered for, every hour of every day.",
    intro: "GCP is where data-heavy products live, and where idle projects go to accumulate cost. We take the organisation onto our rota: the clusters, the pipelines, the IAM bindings and the budget alerts that currently nobody owns.",
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "GKE and Cloud Run upgrades inside your approved window", "Backup verification and restore drills", "Pipeline failure triage with a morning note"] },
      { title: "Every month", items: ["Project and billing review with a delete list", "IAM and service-account drift review", "Quota and autoscaling check", "A plain-language report your finance team can read"] },
    ],
    coverage: {
      title: "The GCP work that happens while you sleep",
      intro: "Clusters, pipelines and the projects around them, watched by named engineers who hand over in writing before your day starts.",
      groups: [
        { title: "Compute & services", items: ["GKE upgrades staged and watched", "Cloud Run instance limits tuned", "Cloud Functions timeouts reviewed", "Spot capacity and preemption handled"] },
        { title: "Data & pipelines", items: ["BigQuery job failures triaged", "Cloud SQL failover tested, not assumed", "Pub/Sub backlogs alarmed and cleared", "Dataflow reruns with a morning note"] },
        { title: "Network & edge", items: ["Load-balancer health and serving paths", "Cloud CDN hit ratios reviewed", "VPN and Interconnect tunnels watched", "Bucket IAM conditions audited"] },
        { title: "Identity & spend", items: ["Service-account keys rotated", "Organisation-policy drift reviewed", "Budget alerts per project, with owners", "Idle projects found and shut down"] },
        { title: "Incident & response", items: ["Severity grading and SLA clocks", "Google Cloud cases opened and chased", "Bridge calls during major incidents", "Post-incident write-ups with actions"] },
        { title: "Change & releases", items: ["Deployment watches through your window", "Rollback rehearsed every quarter", "Maintenance slots agreed in writing", "A change log your auditors can read"] },
      ],
      closer: {
        text: "Name the projects that carry revenue and we will start there; the rest of the organisation follows.",
        cta: "Talk about your GCP estate",
        to: "/contact",
      },
    },
    fitWith: [
      "Your product lives on GKE or Cloud Run with no platform team",
      "BigQuery pipelines currently fail without anyone noticing",
      "Your organisation has more projects than anyone can list",
      "You want one rota covering GCP and the application on top of it",
    ],
    faqs: [
      { q: "We use GCP mostly for data, not hosting. Is that enough?", a: "It is. Pipeline and warehouse cover is most of what we do on GCP for half of our clients." },
      { q: "Can you share cover with our BigQuery consultant?", a: "Yes. They own the models, we own the nights, and the morning handover reaches both." },
      { q: "Do you cover multi-cloud estates?", a: "One rota can carry AWS, Azure and GCP together — most clients start with the provider that hurts and add the others later." },
    ],
  },
];

const INDUSTRIES = [
  {
    slug: "agencies",
    name: "Agencies",
    scene: "city",
    title: "24/7 support for agencies",
    tagline: "Client sites, launch dates and retainer SLAs — carried by a rota that never sleeps, so your account managers never have to.",
    gap: {
      title: "We carry the support your agency sells but never staffs.",
      lead: "Your name is in the footer of every site you build, and the maintenance after it is on nobody's timesheet. We are the desk behind your brand, set up for the work that lands after launch:",
      points: [
        "Client sites that still need a human answer when your office is dark",
        "The update backlog that keeps landing on whoever shipped the build",
        "Campaign and go-live nights watched by engineers who have done this before",
      ],
      question: "Sound like the arrangement your agency has been missing?",
      join: "Talk to us about white-label cover:",
    },
    video: {
      title: "Inside the night shift",
      lead: "Two minutes on what actually happens after you close: what we watch, who picks up the page, and what lands in your inbox by nine.",
      closer: "Want the cover levels and their response clocks side by side?",
      cta: "See the packages",
    },
    caseStudy: { slug: "dexerto" },
    why: {
      title: "Why agencies keep us on the retainer",
      intro: "You sold the client a platform, not an on-call rota. Ten sites, ten stacks and one team that has to be somewhere else — that is the arithmetic we were built for. Here is what changes once the desk is ours:",
      cards: [
        {
          title: "Because your clients never learn the word outage",
          text: "Someone is already awake and already looking. The page gets picked up in minutes, the fix ships through your process, and your account manager reads it in the morning summary rather than the client's escalation.",
        },
        {
          title: "Because your roadmap stops being the fallback",
          text: "The update backlog, the CMS regressions and the odd 2am form breaker stop landing on whoever built the site. Your developers ship what you actually quoted, and the retainer stops eating senior time.",
        },
        {
          title: "Because every stack in the portfolio has an owner",
          text: "WordPress, Sitecore, the headless rebuild, the shop running on three plugins and a hope. Whoever shipped it is not the person on shift at 3am, so each client's stack arrives pre-briefed with its own runbook.",
        },
        {
          title: "Because go-live night has a plan before the traffic",
          text: "Campaign launches get extra eyes on checkout, forms and page speed, a rollback written in advance, and someone watching the dashboards while your team takes the bow.",
        },
        {
          title: "Because the update backlog stops needing a Friday",
          text: "Core, plugin and runtime changes go out inside each client's own window: backups verified first, every change logged, and nothing landing mid-edit on a Friday afternoon.",
        },
        {
          title: "Because the knowledge stays when the developer goes",
          text: "The engineer who built six of your client sites is not the only reason they still work. Decisions, risks and open threads leave every shift written down, so the account survives the resignation.",
        },
        {
          title: "Because your client still hears your name",
          text: "White-label on your domain, your ticket templates and your tone of voice — or our name on the door if the retainer reads better with it. Either way, the client deals with you.",
        },
        {
          title: "Because the queue stops being a group chat",
          text: "One intake per client, graded by the SLA you signed rather than by who shouts loudest. Your founder stops being the unofficial escalation path at midnight.",
        },
      ],
      accent: {
        title: "Because your renewals get evidence, not anecdotes",
        text: "Per-client health summaries, a patch ledger and response clocks you can forward verbatim into the renewal conversation. Sound like the arrangement you are missing?",
        cta: "Talk to us",
        to: "/contact",
      },
    },
    cases: {
      title: "Proof your renewals can quote",
      slugs: ["dexerto", "third-space", "gosalary", "absolute-software"],
    },
    covers: {
      title: "Built by people who have run the agency side",
      intro: "Before there was a rota, there was a studio desk: client emergencies answered at two in the morning between build tickets, and a support promise nobody had staffed. Every routine here was written against that gap.",
      cards: [
        {
          title: "Nobody in your studio carries the pager",
          icon: (
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M30 8a17 17 0 1 0 10 30A19 19 0 0 1 30 8z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M33 7h9l-9 9h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
          text: "Alerts, first response and the 3am fix land on our rota, not on whoever shipped the build. Your developers go back to the next project and the client site still gets answered inside the minutes your SLA promises.",
          closer: "So whoever answers at half past three is already briefed.",
        },
        {
          title: "Your retainers stop losing money after launch",
          icon: (
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.2" />
              <path d="M24 9v15h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 39l4-6 5 4 5-7 4 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
          text: "Support hours are the line every agency under-prices. One invoice across the portfolio, response clocks per client and a monthly summary of where the hours actually went, so the renewal conversation has evidence in it.",
          closer: "Which makes the retainer the hours you priced.",
        },
        {
          title: "Your brand on every reply",
          icon: (
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M6 11h26v17H16l-10 8V11z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M18 32h10l10 8v-8h4V19" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M13 20l5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
          text: "White-label on your domain, your ticket templates and your tone of voice, with our engineers behind them. The escalation reads like it came from your team, because as far as the client is concerned, it did.",
          closer: "One queue per client, one voice: yours.",
        },
      ],
    },
    faq: {
      title: "The cover your agency sells but never staffs",
      intro: "Certified engineers on a published rota, across every stack in the client portfolio. Here is what actually lands on our desk once the retainer is ours.",
      panel: {
        title: "Not covered above?",
        text: "Send the portfolio list and the SLAs sitting behind it, and we will tell you which sites we can carry tonight.",
        cta: "Talk to the night desk",
        to: "/contact",
      },
      items: [
        {
          q: "Client websites, watched around the clock",
          a: "Every retainer site on the same rota: uptime and journey monitoring, triage graded by the response clock you signed, and the fix shipped through your process with your ticket number on it.",
        },
        {
          q: "CMS cover from WordPress to headless",
          a: "Core, plugin and runtime updates inside each client's own window, plus editorial breakages, form regressions and the shop running on three extensions and a hope.",
        },
        {
          q: "The hosting underneath, run properly",
          a: "Shared boxes, managed cloud and static edges alike: patching on a schedule, performance work that survives a traffic spike, and a cost review that ends in actions rather than graphs.",
        },
        {
          q: "White-label answers in your name",
          a: "Your domain, your ticket templates, your tone of voice, our engineers behind them. The client never needs to know a second studio is on the call.",
        },
        {
          q: "End-user requests, taken the whole way",
          a: "Where the agreement allows it we work the queue directly: access requests, the password reset, the escalation that currently reaches your founder on a Sunday evening.",
        },
        {
          q: "Plain English for the words in a retainer",
          a: "Response clock: how long until a human has picked it up. Full-stack: infrastructure and application on one rota. Out-of-hours: overnight and weekend cover only. Escalation path: the line from first triage to whoever can ship the fix. Everything else in the agreement is written the same way, and we walk you through it before anyone signs.",
        },
      ],
    },
    coverage: {
      title: "The cover that runs on every site you have shipped",
      intro: "One rota across the portfolio, graded by the retainer you signed rather than by who shouts first. This is what actually lands on our desk:",
      groups: [
        { title: "Client sites, watched and answered", items: ["Uptime and journey checks per retainer", "Triage graded by the SLA you signed", "Someone on the incident until it closes", "A written handover by nine o'clock"] },
        { title: "Content, forms and checkout", items: ["Editor breakages fixed the same night", "Form, search and cart regressions tested", "Plugin conflicts traced to the culprit", "Cache and media resets before they show"] },
        { title: "Core, plugin and platform updates", items: ["CMS update windows per client site", "Runtime and language upgrades in window", "Backups verified before anything ships", "Rollback ready for every change"] },
        { title: "Access, security and expiry", items: ["Admin access reviews for each portfolio", "Secret and certificate rotation", "Malware scans and file-integrity checks", "Domain, hosting and licence renewals tracked"] },
        { title: "Performance and launch nights", items: ["Page-speed budgets on the money journeys", "Pre-launch capacity and cache checks", "Extra engineers on campaign nights", "Alert tuning that kills the noise"] },
        { title: "Reporting for the renewal", items: ["Monthly health summary per client", "Response clocks measured against the SLA", "A patch ledger across the portfolio", "Incident write-ups you can forward"] },
      ],
      closer: {
        text: "Send the portfolio list and the stacks sitting behind it — we will tell you which sites we can carry tonight.",
        cta: "Talk about white-label cover",
        to: "/contact",
      },
    },
    packages: {
      title: "Pick the cover your portfolio needs",
      intro: "Four ways to put the night desk behind your client sites, priced by how much of the rota we carry rather than by how many tickets arrive. None of them quite fit? Tell us what you run and we cut the agreement to match.",
      tiers: [
        {
          tab: "Office hours only",
          name: "FIRST-LINE DESK",
          items: [
            "Uptime and journey alerts watched",
            "First-line triage in working hours",
            "A named queue per client site",
            "Written handover each morning",
          ],
          cta: "Talk about this tier",
          hover: "Contact",
          to: "/contact?package=first-line-desk",
        },
        {
          tab: "Overnights and weekends",
          name: "OUT-OF-HOURS ROTAS",
          items: [
            "Everything in the first tier",
            "Engineers on call overnight",
            "Weekend and bank-holiday rota",
            "Incident write-ups by nine",
            "Rollbacks shipped in window",
            "Triage graded by your SLA",
          ],
          cta: "Talk about this tier",
          hover: "Contact",
          to: "/contact?package=out-of-hours-rotas",
        },
        {
          tab: "The whole clock",
          name: "ROUND-THE-CLOCK DESK",
          items: [
            "Everything in the out-of-hours tier",
            "One rota across every site",
            "Half-hour response at any hour",
            "Launch nights watched live",
            "Monthly health summary per client",
            "Patch and update ledger kept",
          ],
          cta: "Talk about this tier",
          hover: "Contact",
          to: "/contact?package=round-the-clock-desk",
        },
        {
          tab: "Built around you",
          name: "CUSTOM & ADD-ONS",
          items: [
            "Application-only or full-stack cover",
            "Tighter response clocks per tier",
            "Build tickets folded into the rota",
            "A dedicated squad for one big client",
            "Pipelines and release engineering",
            "A ticket cap that suits the retainer",
            "Something else entirely? Say the word and we will shape it",
          ],
          cta: "Design a package",
          hover: "Contact",
          to: "/contact?package=custom",
        },
      ],
      note: {
        lead: "Need engineers for the build itself?",
        text: "If what you are after is a rebuild or a modernisation rather than a rota, that work sits with a different team —",
        link: "see what we build",
        to: "/cloud",
      },
    },
    reviews: true,
    faqs: [
      { q: "Can you answer clients in our name?", a: "Yes. We answer under your domain, your ticket templates and your tone of voice — or wear our own name if the retainer is better served that way." },
      { q: "What if a client site is on a stack you have not listed?", a: "We onboard new stacks every quarter. Send us the repo and the hosting panel and we will quote cover for it inside a week." },
      { q: "Do you take over mid-retainer, mid-disaster?", a: "We do. Half of our agency engagements start as a rescue: we stabilise first, write the handover second, and the retainer continues without the client noticing the seam." },
    ],
  },
  {
    slug: "saas-platforms",
    name: "SaaS Platforms",
    scene: "net",
    bands: ["intro", "promise", "slabEarly", "why", "coverage", "pricing", "packages",
      "buildNote", "cases", "faq", "slab2", "glance", "impacts"],
    title: "24/7 support for SaaS platforms",
    tagline: "Uptime, observability and release confidence for products where downtime is a churn conversation.",
    gap: {
      title: "A product that never closes needs a desk that never closes",
      split: {
        paras: [
          "Availability is not a feature you ship once and forget. A distributed product is a hundred dependencies nobody can see at the same time, and the renewal conversation is usually decided by whichever one fails on a Sunday.",
          "We run that desk: telemetry watched by engineers who read the code behind the graph, incidents owned from the first alert to the written post-mortem, and a handover on your stand-up screen before the working day starts.",
          "Curious where the cover actually bites?",
          "These are the threads we are pulled on most often:",
        ],
        points: [
          "Cover in every timezone, not just ours",
          "One engineer owns each incident end to end",
          "Traces, logs and metrics read together",
          "Availability targets written into the agreement",
          "Senior platform and SRE people on the rota",
          "Launch nights watched while they happen",
          "Support for stacks nobody else wants to touch",
          "Nobody on your team carrying a pager",
        ],
      },
    },
    promise: [
      {
        title: "Your SLA becomes something we carry",
        icon: (
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M24 5l15 6v13c0 9-6.4 15.6-15 19-8.6-3.4-15-10-15-19V11z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M24 15v9l7 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        text: "You publish an availability number and you pay when you miss it. So do we, on the same clock: alerting on a named rota, triage that reaches the code, and a fix or a rollback decision written down before the renewal team notices. Our agreement exists to hold yours up, so 99.99% stops being a number you have to defend.",
      },
      {
        title: "Nothing inside the system stays invisible",
        icon: (
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2.2" />
            <path d="M24 12a12 12 0 0 1 12 12M24 36A12 12 0 0 1 12 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M24 5a19 19 0 0 1 19 19M24 43A19 19 0 0 1 5 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ),
        text: "Distributed products are efficient and opaque in the same breath. We work the telemetry you already run — traces, logs, queue depth, worker lag — until the black box has a shape, then tune the alerts so they wake a person instead of a mailbox nobody reads. Visibility first: every incident after that is shorter.",
      },
      {
        title: "Your customers get an answer, not a queue",
        icon: (
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M9 27v-5a15 15 0 0 1 30 0v5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="5" y="25" width="9" height="14" rx="4.5" stroke="currentColor" strokeWidth="2.2" />
            <rect x="34" y="25" width="9" height="14" rx="4.5" stroke="currentColor" strokeWidth="2.2" />
            <path d="M20 39h8a7 7 0 0 1-7 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ),
        text: "Plenty of product teams hand us the end-user queue along with the infrastructure. A login that fails in one region, an export that quietly truncates, a webhook that stopped firing on a Tuesday: those tickets land on our desk overnight and come back resolved, with the fix written up for your changelog. One rota behind your support address, either side of midnight.",
      },
      {
        title: "Technical debt stops compounding nightly",
        icon: (
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M6 8v32h36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M12 16l9 8 7-5 12 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 32h-8v-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        text: "Stability work is not only watching. We pull apart the monolith edges that slow every release, move the jobs that block deploys behind flags, and take the waste out of a cloud bill that grew faster than the product. The reliability review is where that list gets written, and where it gets closed. The platform you renew on need not be the one you started with.",
      },
    ],
    caseStudy: { slug: "absolute-software", split: "4-1-7", slot: "early" },
    why: {
      title: "How the cover actually holds",
      intro: "Holds against what? A p1 at four in the morning, a canary that never went green, a vendor that changed its API contract without telling anyone, an audit asking for evidence from a quarter you have already forgotten. This is the machinery behind the promise:",
      cards: [
        {
          title: "Someone is awake before your customers are",
          text: "Alerts land on a rota with names on it, not a mailbox nobody owns. First response is measured in minutes at 03:00 and at 15:00, and whoever picks it up has already read the runbook for that service.",
        },
        {
          title: "Triage reaches the code, not the dashboard",
          text: "We read repositories for a living. When a latency spike turns out to be a query plan that moved with the last migration, that is the finding in the ticket rather than a screenshot of the graph that went red.",
        },
        {
          title: "Your team stops being the fallback",
          text: "The people who built the service should be designing the next one. The routine work — the flaky worker, the expiring certificate, the dependency that has to move — gets absorbed by the rota instead of interrupting them.",
        },
        {
          title: "Releases stop being an act of nerve",
          text: "Every deploy gets a watcher, a canary check and a rollback that has been rehearsed rather than imagined. That is how a product team gets back to shipping on a Tuesday afternoon instead of waiting for a window.",
        },
        {
          title: "Evidence accumulates while you sleep",
          text: "Patch logs, access reviews, restore tests and incident write-ups, filed against the date they happened. When an audit or an enterprise prospect asks, the answer is a folder instead of a fortnight of archaeology.",
        },
        {
          title: "The end-user queue has an owner overnight",
          text: "A login that breaks in one region, an export that quietly truncates, a webhook that stopped firing on a Tuesday. Those come to us, get fixed or reproduced with a case number, and land back on your desk explained.",
        },
        {
          title: "Upstream failures get caught first",
          text: "Payments, identity, email, the analytics script that started blocking your checkout. We watch the dependency graph as closely as the infrastructure, so a vendor outage becomes your incident note rather than your customer's complaint.",
        },
        {
          title: "The bill stops outrunning the product",
          text: "Telemetry spend, idle capacity and storage nobody deletes get counted monthly, with a named action against each line. Reliability work that ignores the invoice does not survive its second year.",
        },
        {
          title: "Renewal season opens with numbers",
          text: "Availability against the promise, error budget consumed, response clocks, and what changed since last quarter. Your customer team quotes from the same report we wrote, which is rather the point of having one.",
        },
      ],
    },
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "Triage to code level with a fix or a rollback decision", "Deploy and canary watches through your release window", "Queue, worker and webhook backlog checks"] },      { title: "Every month", items: ["Error-budget and incident review with your engineers", "Observability audit: alerts that page humans, not mailboxes", "Capacity and scaling-policy review ahead of your growth curve", "A reliability report your customer teams can quote in renewal calls"] },
    ],
    coverage: {
      title: "The reliability work that happens while you sleep",
      intro: "Alerts that page a named engineer, triage that reaches the code, and a handover your stand-up can read out loud. The routine looks like this:",
      groups: [
        { title: "Availability & journeys", items: ["Synthetic signup and checkout runs", "Real-user speed budgets per release", "Error budgets tracked, not estimated", "A status page that tells the truth"] },
        { title: "Application health", items: ["Latency percentiles and error rates", "Queue depth and worker lag watched", "Memory leaks caught on day six", "Log volume anomalies triaged early"] },
        { title: "Incident & response", items: ["Severity grading and SLA clocks", "Triage to code level overnight", "Fix or rollback decided in writing", "Blameless reviews with follow-through"] },
        { title: "Releases & rollbacks", items: ["Deploy watches through your window", "Canary checks before full traffic", "Feature-flag hygiene reviewed", "Rollback rehearsed before it is needed"] },
        { title: "Data & integrations", items: ["Database health and slow queries", "Replication lag and failover tests", "Third-party API failures caught", "Webhook backlogs cleared overnight"] },
        { title: "Observability as a service", items: ["Alert tuning that kills the noise", "Dashboards owned, not abandoned", "SLO and uptime reporting monthly", "Telemetry spend reviewed for value"] },
      ],
      closer: {
        text: "Send your stack and your worst month on it — we will show you which nights would have been quieter.",
        cta: "Talk about your platform",
        to: "/contact",
      },
    },
    fitWith: [
      "Downtime and degradation cost you renewals, not just embarrassment",
      "Your on-call rota is thinner than your uptime promise",
      "You want incident response that reads code, not just dashboards",
      "Releases have slowed down because nobody trusts the nights",
    ],
    faqs: [
      { q: "Do you replace our SRE team?", a: "No. We take the nights and the routine so your SREs spend their days on platform work instead of pager hangovers." },
      { q: "Can you work inside our existing observability stack?", a: "Yes. Datadog, Grafana, Sentry, CloudWatch or a homegrown dashboard — we answer what you already have and propose what is missing." },
      { q: "Who talks to our customers during an incident?", a: "Your team does, with our status notes as the source. We write the internal truth; you decide the public wording." },
    ],
  },
  {
    slug: "ecommerce",
    name: "eCommerce",
    title: "24/7 support for eCommerce",
    tagline: "Checkout, payments and catalogue uptime for stores where an hour dark is a month of revenue.",
    whatTitle: "What eCommerce support from us means",
    intro: "A store is never 'down for maintenance' — it is down for revenue. Most commerce teams we meet watch the server but not the sale: the payment gateway that fails only on one card type, the promo code that breaks the basket, the checkout that slows every evening at peak. We watch the money path as closely as the machines.",
    capabilities: [
      { title: "Every night", items: ["Synthetic purchases through checkout on a published rota", "Payment gateway, webhook and refund flow monitoring", "Platform, plugin and runtime patching inside your trading window", "Backup and restore verification before peak seasons"] },
      { title: "Every month", items: ["Conversion-path performance review with page-speed metrics", "Integration and feed health audit", "Peak-readiness check ahead of every campaign in the calendar", "A trading report your commercial team can read without a translator"] },
    ],
    coverage: {
      title: "The trading work that happens while you sleep",
      intro: "Synthetic baskets at three in the morning, gateway health before the campaign, and incidents graded by revenue at risk. Here is the cover:",
      groups: [
        { title: "Checkout & payments", items: ["Synthetic purchases on a published rota", "Gateway, webhook and refund-flow checks", "Card-type edge cases reproduced fast", "Fraud rules reviewed for false rejections"] },
        { title: "Storefront & catalogue", items: ["Page speed under campaign load", "Search and filter regressions caught", "Stock and price feed failures triaged", "Theme and plugin conflicts traced"] },
        { title: "Integrations & fulfilment", items: ["ERP and order-management sync health", "Courier and label API failures chased", "Marketplace feeds watched end to end", "The order that never reached the warehouse"] },
        { title: "Peak & campaigns", items: ["Capacity checks before every sale", "Extra engineers through the window", "Freeze windows agreed in writing", "A rollback plan for each deploy"] },
        { title: "Security & compliance", items: ["Patching inside your trading window", "Card-data scope reviewed annually", "Bot and scraper rules tuned", "Credential leaks watched and closed"] },
        { title: "Trading & reporting", items: ["Conversion-path performance monthly", "Incident cost in revenue, not uptime", "Peak-readiness notes before the calendar", "A trading report your commercial team can read"] },
      ],
      closer: {
        text: "Tell us your platform, your peak and your last bad weekend, and we will quote cover against all three.",
        cta: "Talk about your store",
        to: "/contact",
      },
    },
    fitWith: [
      "An hour of checkout downtime is a board-level number",
      "You trade through peaks that your current cover cannot absorb",
      "Payment and fulfilment integrations fail in ways monitoring misses",
      "You want cover that watches the sale, not just the server",
    ],
    faqs: [
      { q: "Do you cover Magento and Shopify Plus builds?", a: "Yes, plus WooCommerce, BigCommerce and headless stacks. Platform-specific cover sits under our platforms pages; this rota covers whichever one you trade on." },
      { q: "Can you join our Black Friday war room?", a: "We run them. Capacity review two weeks out, freeze windows agreed, extra engineers on shift and a live incident channel for the weekend." },
      { q: "What if the failure is the payment provider's?", a: "We detect it, prove it with transaction traces, open the case with the provider and keep your team informed until it closes." },
    ],
  },
];

const PAGES = [
  ...PROVIDERS.map((page) => ({ ...page, kind: "provider" })),
  ...INDUSTRIES.map((page) => ({ ...page, kind: "industry" })),
];

/* Our own city skyline: three rows of blocks that ramp up from left to right,
   so the copy sits over a low horizon and the town grows behind the rocket.
   The window pattern is deterministic — the same page paints the same way. */
const CITY_BACK = [
  [0, 150, 96], [150, 90, 118], [240, 130, 84], [370, 80, 132], [450, 150, 104],
  [600, 100, 148], [700, 140, 118], [840, 90, 164], [930, 150, 132], [1080, 110, 180],
  [1190, 130, 148], [1320, 120, 196],
];
const CITY_MID = [
  [40, 120, 128], [170, 80, 152], [260, 140, 110], [410, 100, 166], [520, 130, 134],
  [660, 90, 180], [760, 150, 146], [920, 100, 198], [1030, 140, 164], [1180, 90, 214],
  [1280, 160, 180],
];
const CITY_FRONT = [
  [0, 140, 96], [150, 110, 128], [270, 150, 104], [430, 100, 140], [540, 160, 118],
  [710, 120, 160], [840, 150, 132], [1000, 110, 186], [1120, 160, 152], [1290, 150, 206],
];

/* The SaaS scene: one desk answering six watched services, laid out on a
   hexagon so every wire leaves the core at the same length. */
const NET_NODES = [
  { x: 220, y: 62 }, { x: 366, y: 150 }, { x: 366, y: 330 },
  { x: 220, y: 418 }, { x: 74, y: 330 }, { x: 74, y: 150 },
];

function skylineWindows() {
  const cells = [];
  CITY_FRONT.forEach(([x, w, h], b) => {
    const cols = Math.floor((w - 20) / 22);
    const rows = Math.floor((h - 26) / 26);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const seed = (c * 3 + r * 5 + b * 7) % 7;
        if (seed > 2) continue;
        cells.push({
          key: `${b}-${c}-${r}`,
          x: x + 11 + c * 22,
          y: 320 - h + 14 + r * 26,
          lit: seed === 0,
        });
      }
    }
  });
  return cells;
}

export default function SupportDetail() {
  const { slug } = useParams();
  const provider = PAGES.find((p) => p.slug === slug);
  const [filmSlug, setFilmSlug] = useState("");
  const playing = filmSlug === slug;
  const filmRef = useRef(null);
  const startFilm = () => {
    setFilmSlug(slug);
    filmRef.current?.play().catch(() => {});
  };
  useTitle(provider ? `${provider.title} | Just After Midnight` : "24/7 Support | Just After Midnight");
  const { data: caseStudies } = useApi(provider?.caseStudy || provider?.cases ? "/api/case-studies" : null);
  const featured = provider?.caseStudy ? (caseStudies || []).find((study) => study.slug === provider.caseStudy.slug) : null;

  if (!provider) return <NotFound />;

  const others = PAGES.filter((p) => p.kind === provider.kind && p.slug !== slug);

  /* The reference does not run the same band order on every support sub-page: its
     SaaS page puts the case slab above the icon grid and closes on the glance and
     impact rows, where the agencies page runs the video first and the slab last.
     So the sequence is page data. Each band still renders only when the page has
     content for it, which is why the default below is the order the other pages
     already measured against. */
  const BANDS = {
    intro: provider.gap ? (
        provider.gap.split ? (
          <div className="seo-intro seo-intro--split">
            <h2 className="seo-intro-title reveal">{provider.gap.title}</h2>
            <div className="seo-intro-split">
              <div className="seo-intro-body reveal">
                {provider.gap.split.paras.map((para) => <p key={para}>{para}</p>)}
              </div>
              <span className="seo-intro-rule" aria-hidden="true" />
              <ul className="seo-intro-points seo-intro-points--marked reveal">
                {provider.gap.split.points.map((point) => (
                  <li key={point}>
                    <svg className="seo-intro-mark" viewBox="0 0 25 25" width="25" height="25" aria-hidden="true" focusable="false">
                      <path d="M15.5 3a10 10 0 1 0 6.4 12.9A11.5 11.5 0 0 1 15.5 3z" fill="var(--amber)" />
                      <circle cx="19.4" cy="6.4" r="2.1" fill="var(--amber)" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="seo-intro">
            <h2 className="seo-intro-title reveal">{provider.gap.title}</h2>
            <div className="seo-intro-body reveal">
              <p>{provider.gap.lead}</p>
              <ul className="seo-intro-points">
                {provider.gap.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p>{provider.gap.question}</p>
              <h4 className="seo-intro-join"><Link to="/contact">{provider.gap.join}</Link></h4>
            </div>
          </div>
        )
      ) : (
        <div className="plat-what reveal">
          <div>
            <h2>{provider.whatTitle || `What does ${provider.name} support from us mean?`}</h2>
            <p>{provider.intro}</p>
          </div>
        </div>
      ),

    promise: provider.promise && <OutcomeBand variant="boxes" cards={provider.promise} />,

    slabEarly: provider.caseStudy?.slot === "early" && (
        <CaseFeature study={featured} variant="detail" split={provider.caseStudy.split} />
      ),

    video: provider.video && (
        <section className="how-it-works">
          <div className="container">
            <div className="hiw-grid">
              <div className="hiw-media reveal">
                <video
                  ref={filmRef}
                  className="hiw-video"
                  src="/video/brand-video.mp4"
                  poster="/video/brand-poster.jpg"
                  preload="none"
                  controls={playing}
                  playsInline
                  onEnded={() => setFilmSlug("")}
                />
                {!playing && (
                  <button type="button" className="hiw-play" onClick={startFilm} aria-label={`Play: ${provider.video.title}`}>
                    <svg viewBox="0 0 35 38" width="35" height="38" aria-hidden="true" focusable="false">
                      <path d="M2 2l31 17L2 36z" fill="#ffffff" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="hiw-copy reveal">
                <h2>{provider.video.title}</h2>
                <p>{provider.video.lead}</p>
                <p>{provider.video.closer}</p>
                <Link to="/support" className="btn btn-navy btn-lg">{provider.video.cta}</Link>
              </div>
            </div>
          </div>
        </section>
      ),

    why: provider.why && (
        <WhyBand
          variant="detail"
          title={provider.why.title}
          intro={provider.why.intro}
          cards={provider.why.cards}
          accent={provider.why.accent}
        />
      ),

    cases: provider.cases && (
        <CaseStudiesBand
          variant="detail"
          title={provider.cases.title}
          studies={provider.cases.slugs.map((slug) => (caseStudies || []).find((study) => study.slug === slug)).filter(Boolean)}
        />
      ),

    covers: provider.covers && (
        <OutcomeBand
          variant="detail"
          title={provider.covers.title}
          intro={provider.covers.intro}
          cards={provider.covers.cards}
        />
      ),

    faq: provider.faq && (
        <FaqBand
          variant="detail"
          title={provider.faq.title}
          intro={provider.faq.intro}
          faqs={provider.faq.items}
          panel={provider.faq.panel}
        />
      ),

    coverage: provider.coverage && (
        <CapabilityBand
          variant="detail"
          title={provider.coverage.title}
          intro={provider.coverage.intro}
          groups={provider.coverage.groups}
          closer={provider.coverage.closer}
        />
      ),

    packages: provider.packages && (
        <PackageBand
          title={provider.packages.title}
          intro={provider.packages.intro}
          tiers={provider.packages.tiers}
          note={provider.packages.note}
        />
      ),

    capabilities: provider.capabilities && (
        <div className="platform-band">
          <h2 className="band-title band-title--dark band-title--center reveal">What the cover includes</h2>
          <span className="band-rule band-rule--center" aria-hidden="true" />
          <div className="cap-grid cap-grid--2">
            {provider.capabilities.map((cap) => (
              <article className="cap-card reveal" key={cap.title}>
                <h3>{cap.title}</h3>
                <span className="cap-rule" aria-hidden="true" />
                <ul>
                  {cap.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      ),

    fitWith: provider.fitWith && (
        <div className="platform-band">
          <h2 className="band-title band-title--dark band-title--center reveal">A good fit if</h2>
          <span className="band-rule band-rule--center" aria-hidden="true" />
          <ul className="fit-list reveal">
            {provider.fitWith.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ),

    packagesNote: !provider.packages && (
        <div className="packages-band reveal">
          <div>
            <h2>Our service packages</h2>
            <p>Everything we support is covered by one of three packages — pick the lightest one that genuinely covers you.</p>
          </div>
          <Link to="/support" className="btn btn-primary">Compare packages <span aria-hidden="true">➔</span></Link>
        </div>
      ),

    slab: provider.caseStudy && provider.caseStudy.slot !== "early" && (
        <CaseFeature study={featured} variant="detail" split={provider.caseStudy.split} />
      ),

    reviews: provider.reviews && <ReviewsBand />,

    faqSection: (<div className="faq-section">
        <h2 className="section-title reveal">FAQ</h2>
        <div className="faq-list reveal">
          {provider.faqs.map((faq) => (
            <details className="faq-item" key={faq.q}>
              <summary>{faq.q}<span className="faq-chevron" aria-hidden="true"></span></summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-more reveal">More questions? <Link to="/contact">Ask us anything</Link> — we answer quickly, even at strange hours.</p>
      </div>),

    others: (<div className="other-platforms">
        <h2 className="section-title reveal">We also cover</h2>
        <div className="other-platform-grid">
          {others.map((other) => (
            <Link className="other-platform-chip reveal" to={`/support/${other.slug}`} key={other.slug}>
              {other.title}
            </Link>
          ))}
          <Link className="other-platform-chip other-platform-chip--all reveal" to="/support">
            All support services <span aria-hidden="true">➔</span>
          </Link>
        </div>
      </div>),
  };
  const bandOrder = provider.bands || ["intro", "promise", "slabEarly", "video", "why", "cases", "covers", "faq", "coverage", "packages", "capabilities", "fitWith", "packagesNote", "slab", "reviews", "faqSection", "others"];

  return (
    <>
      <section className={`page-hero page-hero--support${provider.scene ? ` page-hero--${provider.scene}` : ""}`}>
        <div className="hero-stars" aria-hidden="true">
          <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice">
            <g fill="#ffffff">
              <circle cx="140" cy="90" r="1.6" opacity=".7" /><circle cx="360" cy="210" r="1.2" opacity=".5" />
              <circle cx="620" cy="70" r="1.8" opacity=".8" /><circle cx="880" cy="160" r="1.1" opacity=".4" />
              <circle cx="1120" cy="80" r="1.5" opacity=".7" /><circle cx="1300" cy="220" r="1.3" opacity=".6" />
              <circle cx="1400" cy="110" r="1.7" opacity=".8" /><circle cx="240" cy="360" r="1.2" opacity=".4" />
              <circle cx="720" cy="340" r="1.4" opacity=".6" /><circle cx="1180" cy="380" r="1.2" opacity=".5" />
              <circle cx="500" cy="430" r="1.5" opacity=".7" /><circle cx="960" cy="450" r="1" opacity=".4" />
            </g>
          </svg>
        </div>
        {provider.scene === "city" && (
          <div className="city-skyline" aria-hidden="true">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
              <g className="city-back">
                {CITY_BACK.map(([x, w, h]) => <rect key={`b${x}`} x={x} y={320 - h} width={w - 6} height={h} />)}
              </g>
              <g className="city-mid">
                {CITY_MID.map(([x, w, h]) => <rect key={`m${x}`} x={x} y={320 - h} width={w - 8} height={h} />)}
              </g>
              <g className="city-front">
                {CITY_FRONT.map(([x, w, h]) => <rect key={`f${x}`} x={x} y={320 - h} width={w - 10} height={h} />)}
              </g>
              <g className="city-windows">
                {skylineWindows().map((c) => (
                  <rect key={c.key} className={c.lit ? "is-lit" : undefined} x={c.x} y={c.y} width={8} height={12} />
                ))}
              </g>
            </svg>
          </div>
        )}
        {provider.scene === "city" && (
          <div className="city-art" aria-hidden="true">
            <svg viewBox="0 0 220 300">
              <circle className="city-moon" cx="42" cy="40" r="22" />
              <g className="city-rocket">
                <path d="M124 30c22 24 32 58 32 96v50H92v-50c0-38 10-72 32-96z" />
                <circle className="city-porthole" cx="124" cy="112" r="14" />
                <path className="city-fin" d="M92 138v48H56c6-24 18-42 36-48z" />
                <path className="city-fin" d="M156 138v48h36c-6-24-18-42-36-48z" />
                <path className="city-flame" d="M108 176h32l-5 20-11 26-11-26z" />
              </g>
            </svg>
          </div>
        )}
        {provider.scene === "net" && (
          <div className="net-art" aria-hidden="true">
            <svg viewBox="0 0 440 480" fill="none">
              <g className="net-wires">
                {NET_NODES.map((n) => (
                  <path className="net-wire" key={`w${n.x}-${n.y}`} d={`M220 240L${n.x} ${n.y}`} />
                ))}
              </g>
              <g className="net-pulses">
                {NET_NODES.map((n, i) => (
                  <path
                    className="net-pulse"
                    key={`p${n.x}-${n.y}`}
                    pathLength="100"
                    d={`M220 240L${n.x} ${n.y}`}
                    style={{ animationDelay: `${i * 0.8}s` }}
                  />
                ))}
              </g>
              <g className="net-nodes">
                {NET_NODES.map((n, i) => (
                  <g
                    className="net-node"
                    key={`n${n.x}-${n.y}`}
                    transform={`translate(${n.x} ${n.y})`}
                    style={{ animationDelay: `${i * 0.45}s` }}
                  >
                    <rect x="-31" y="-21" width="62" height="42" rx="9" />
                    <path d="M-19 -8h38M-19 1h38M-19 10h22" />
                  </g>
                ))}
              </g>
              <g className="net-core">
                <rect x="152" y="204" width="136" height="72" rx="14" />
                <path d="M172 230h58M172 248h84" />
                <circle className="net-core-dot" cx="264" cy="230" r="7" />
              </g>
            </svg>
          </div>
        )}
        <div className="container">
          <div className="hero-copy">
            <p className="breadcrumb">
              <Link to="/support">24/7 Support</Link> <span aria-hidden="true">/</span> {provider.name}
            </p>
            <h1 className="page-hero-title support-hero-title reveal">{provider.title}</h1>
            <p className="page-hero-sub support-hero-sub reveal">{provider.tagline}</p>
            <div className="hero-actions reveal">
              <Link to="/contact" className="btn btn-primary support-hero-cta">Get in touch <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
        </div>
        <div className="support-hero-divider" aria-hidden="true">
          <svg viewBox="0 0 1920 160" preserveAspectRatio="none">
            <path d="M0 68 C180 24 320 0 480 0 C700 0 1120 135 1450 135 C1660 135 1790 100 1920 69 L1920 160 L0 160 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      <section className="platform-detail">
        <div className="container">
          {bandOrder.map((key) => (
            <Fragment key={key}>{BANDS[key]}</Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
