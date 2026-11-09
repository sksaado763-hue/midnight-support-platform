import { Fragment, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi, postJson } from "../lib/api";
import CaseFeature from "../components/CaseFeature";
import CapabilityBand from "../components/CapabilityBand";
import CaseStudiesBand from "../components/CaseStudiesBand";
import FaqBand from "../components/FaqBand";
import GlanceBand from "../components/GlanceBand";
import ImpactBand from "../components/ImpactBand";
import InsightsBand from "../components/InsightsBand";
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
    bands: ["intro", "promise", "slabEarly", "why", "coverage", "packages",
      "cases", "faq", "slab2", "insights", "glance", "impacts"],
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
    /* The reference runs the same case-study template twice on this page, the
       second copy after the FAQ. A different study keeps the page from naming
       the same client in two places. */
    slab2: { slug: "gosalary", split: "4-1-7" },
    /* The reference slips its reading list between the second slab and the
       at-a-glance card. The cards themselves come from the same article feed
       /support runs, so this page only supplies the framing. */
    insights: { title: "Field notes for a platform that cannot go quiet", variant: "plain" },
    /* The reference closes every support page with the same two slabs — the
       at-a-glance card and the impact/sources row — and /support runs the same
       pair. The questions here are the spec-sheet ones a buyer asks before a
       rota changes hands, which is a different register from the FAQ above. */
    glance: {
      eyebrow: "The short version",
      title: "What we take on for a SaaS platform",
      items: [
        {
          q: "Who is actually on the pager?",
          a: <>Three shifts, one queue, <strong>names on the rota</strong>. Whoever picks up your alert has already read that service's runbook and seen the deploy that shipped before it.</>,
        },
        {
          q: "Which layers of the stack are covered?",
          a: "The cloud accounts, what runs on them — containers, serverless functions, queues, databases — the release pipeline that pushes all of it, and the third-party APIs your product is stitched together from but cannot patch yourself.",
        },
        {
          q: "How is the availability promise written down?",
          a: <>A first-response clock per severity, a change window you approve in advance, and a monthly report that lists every miss against <strong>the number we quoted</strong>. It goes in the contract, not on a slide.</>,
        },
        {
          q: "What happens when a 2am deploy goes bad?",
          a: "We roll it back first and read the logs after. Your team wakes up to the diff, the reason it broke and the fix that went in — not a thread of guesses at 40,000 people.",
        },
        {
          q: "What do you need from us before the first night?",
          a: "Read access to the stack, whoever can approve an emergency rollback at short notice, and the list of vendors whose APIs the product leans on. Everything else we work out in the first fortnight.",
        },
      ],
    },
    impacts: {
      q: "What does an hour of downtime do to a subscription product?",
      a: <>The hour is the smallest part of it. Churn does not arrive as a spike the morning after an outage — it arrives as the customer who found your product unreliable twice and quietly stopped renewing seats. Then it is the release your team held back for a week because nobody trusted the pipeline, and the two engineers who were meant to be building the roadmap and were instead reading last night's logs. <strong>Every one of those is a cost line</strong>, and none of them show up in an uptime report.</>,
      sourcesHead: "Where those numbers come from",
      sources: [
        "Renewal and seat-count data from the platforms we have taken over, before and after the first quarter on the rota",
        "Release-frequency records from our own handover notes, logged against the incidents that paused a deploy",
        "Engineering time booked against incident response in the monthly reports we send clients",
      ],
    },
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
      titleScale: "h2",
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
    /* The reference's three closing prose sections — the centred title over the
       narrower copy column, the four-column table, the one-line handover — are
       the block PackageBand already renders on the agencies page, so SaaS takes
       the same component. Two measured differences travel as props: this page's
       prose section declares pt-md-4 over and above its top margin, and its
       closing link is an accent rather than plain ink. */
    packages: {
      introGap: true,
      title: "How much of the clock do we carry?",
      intro: "Four ways to put engineers behind a platform that never closes. Take one as written, blend two, or point us at the corner of the stack nobody on your team wants to own.",
      introTail: { lead: "We cut the agreement around that — just", link: "tell us what you run", to: "/contact" },
      tiers: [
        {
          tab: "The early warning",
          name: "MONITORING & TRIAGE",
          items: [
            "Uptime and journey probes",
            "First-line triage in hours",
            "Alerts routed by name",
          ],
          cta: "Talk about this tier",
          hover: "Contact",
          to: "/contact?package=monitoring-triage",
        },
        {
          tab: "Nights and weekends",
          name: "OUT-OF-HOURS ROTAS",
          items: [
            "Everything in tier one",
            "Engineers on call overnight",
            "Weekend and holiday rota",
            "Incident notes by nine",
            "Rollbacks shipped in window",
            "Response clocks per service",
          ],
          cta: "Talk about this tier",
          hover: "Contact",
          to: "/contact?package=out-of-hours-rotas",
        },
        {
          tab: "The whole clock",
          name: "ROUND-THE-CLOCK DESK",
          items: [
            "Everything in tier two",
            "One rota, every service",
            "Deploys watched as they run",
            "Error budgets reviewed monthly",
            "Status page kept honest",
            "Quarterly reliability roadmap",
          ],
          cta: "Talk about this tier",
          hover: "Contact",
          to: "/contact?package=round-the-clock-desk",
        },
        {
          tab: "Cut to your stack",
          name: "CUSTOM & ADD-ONS",
          items: [
            "App-only or full-stack cover",
            "Tighter response clocks",
            "SRE and observability work",
            "Cost and capacity reviews",
            "Compliance evidence packs",
            "A ticket cap you choose",
            "Something else? Say the word",
          ],
          cta: "Design a package",
          hover: "Contact",
          to: "/contact?package=custom",
        },
      ],
      note: {
        lead: "Want the platform rebuilt, not only held?",
        text: "Rebuilds and modernisation sit with a different team —",
        link: "see what we build",
        to: "/cloud",
      },
    },
    /* The reference's case-study-examples slider, same four cards the agencies
       page runs through CaseStudiesBand's detail variant. The study this page
       already opens with its own slab is left out of the grid. This instance has
       no empty subtitle paragraph in its header row, hence the tighter drop. */
    cases: {
      title: "Platforms that got their nights back",
      slugs: ["the-body-coach-app", "paylocity", "structureflow", "gozem"],
      tightHeader: true,
    },
    fitWith: [
      "Downtime and degradation cost you renewals, not just embarrassment",
      "Your on-call rota is thinner than your uptime promise",
      "You want incident response that reads code, not just dashboards",
      "Releases have slowed down because nobody trusts the nights",
    ],
    /* The reference's how-it-works accordion. This instance declares its own
       padding instead of a margin and keeps no filler paragraph under the
       standfirst, hence `padded` on the band below. */
    faq: {
      padded: true,
      title: "What people ask before they hand us the clock",
      intro: "The four tiers above say what we carry. This is the part every founder wants spelled out before a rota changes hands.",
      items: [
        {
          q: "Who actually picks up when an alert fires at three in the morning?",
          a: "A named engineer on our rota, not a queue. They read the dashboards you already run, decide whether it is a page or a ticket, and act before your own team is awake.",
        },
        {
          q: "Can you work inside our existing observability stack?",
          a: "Yes. Datadog, Grafana, Sentry, CloudWatch or a homegrown board — we answer what you already have and propose what is missing, rather than asking for a second source of truth.",
        },
        {
          q: "Which numbers would be watched on the platform?",
          a: "Availability and error rates at the edge and per endpoint, latency percentiles, queue depth, database saturation, certificate and DNS expiry, the third-party services your product leans on, and each release as it rolls out.",
        },
        {
          q: "Can you hold the uptime promise we have made our own customers?",
          a: "Yes, and in writing. Your response and resolution clocks become ours, along with the evidence that goes with them at renewal time.",
        },
        {
          q: "Do you replace our SRE team?",
          a: "No. We take the nights and the routine so your engineers spend their days on platform work instead of pager hangovers.",
        },
        {
          q: "Who talks to our customers while something is burning?",
          a: "Your team does, with our status notes as the source. We write the internal truth; you decide the public wording.",
        },
        {
          q: "We run services nobody outside built them. Still coverable?",
          a: "Usually. We read code before we read dashboards, so an in-house service or a dependency nobody owns is not a reason to leave it uncovered.",
        },
        {
          q: "What does the first week look like?",
          a: "Read-only access, a written map of what we found against what your SLAs assume, then the plan you approve. Nothing changes on the platform until you say so.",
        },
      ],
      panel: {
        title: "Still deciding?",
        text: "Send the stack and the clocks sitting behind it — we will tell you which of those nights stop being yours.",
        cta: "Talk about your platform",
        to: "/contact",
      },
    },
  },
  {
    slug: "ecommerce",
    name: "eCommerce",
    pageTitle: "eCommerce",
    scene: "ecom",
    title: "Managed Services for eCommerce",
    tagline: "Keeping modern eCommerce platforms fast, stable and revenue-ready around the clock",
    bands: [
      "intro",
      "video",
      "ecomServices",
      "ecomCloud",
      "ecomSecurity",
      "ecomConsult",
      "ecomWhy",
      "insights",
      "glance",
      "impacts",
      "others",
    ],
    gap: {
      title: "What we do",
      head: [
        "Think of it this way: you’re Steve Jobs; we’re whoever the other guys were.",
        "From composable commerce to mile-a-minute feature rollouts, modern eCommerce teams need a managed services partner who can keep up. That’s us. We run the platform, support the stack and strengthen the architecture, so you can innovate with confidence.",
        "Whether it’s 24/7 full-stack support, next-gen cloud designs or high-scale serverless builds, we’ve got you covered.",
      ],
      columns: {
        left: [
          { h: "Supporting your solution", p: "Behind every great eCommerce brand is a great 24/7 support team. That’s where we come in. We combine the right engineers, the right tooling and a genuinely follow-the-sun model to keep your digital estate stable around the clock." },
          { p: "Here’s how we keep you moving:" },
          { h: "We support your full digital presence, end-to-end", p: "Your storefront, your headless CMS, your checkout APIs, your POS content layer, your integrations. It’s all covered. You pick the SLA, we take care of the rest." },
          { h: "We work comfortably across modern eCommerce stacks", p: "Containerised microservices? Composable commerce? API-first everything? Yes, yes and yes. Whatever your stack looks like today, we slot in and support it." },
        ],
        right: [
          { h: "We prevent outages before they land", p: "With Mission Control, our internal full-stack support platform, we get a birds-eye view of:" },
          { items: ["Infrastructure health", "Business-critical metrics", "Microservices and container signals", "API behaviour", "Patch feeds", "Third party integrations"] },
          { p: "Where most teams struggle to gain visibility across modern, distributed architectures, we were built for it." },
          { h: "We integrate seamlessly with your team", p: "We build runbooks with you, agree ownership lines, define escalations and then operate quietly behind the scenes — resolving issues before they turn into incidents and keeping your team focused on innovation." },
        ],
      },
    },
    video: {
      title: "See it in action",
      lead: "Get a glimpse at the behind-the-scenes machinery that allows us to keep eCommerce platforms online, 24/7.",
    },
    services: [
      {
        title: "Around-the-Clock Reliability",
        icon: "/icons/clock-arrow.webp",
        text: "24/7 monitoring, incident response and platform oversight covering the full digital ecosystem: storefronts, APIs, headless CMS, microservices, POS integrations and cloud infrastructure. Issues are detected and resolved before they impact trading.",
      },
      {
        title: "Modernisation & Optimisation",
        icon: "/icons/migration.webp",
        text: "Enhancements that unlock speed, stability and innovation, from adopting serverless patterns to reshaping legacy components, improving CI/CD pipelines or enabling composable commerce architectures.",
      },
      {
        title: "Cloud Management for eCommerce",
        icon: "/icons/cloud-support.webp",
        text: "Day-to-day management of cloud environments powering eCommerce platforms. Includes performance tuning, autoscaling, cost optimisation and advanced cloud-native capabilities to ensure fast, consistent customer experiences during peak traffic.",
      },
      {
        title: "Managed Security for eCommerce",
        icon: "/icons/security.png",
        text: "Continuous vulnerability scanning, patch oversight, asset monitoring and proactive threat detection. Designed to support PCI considerations, consumer data security and the fast-changing threat landscape facing online retailers.",
      },
      {
        title: "Digital Customer Experience (DCX) Expertise",
        icon: "/icons/love.png",
        text: "As an AWS DCX Partner, we support the creation of rich, high-performing digital commerce experiences. Ideal for brands building interactive, content-heavy or multi-market storefronts.",
      },
      {
        title: "Platform Support",
        icon: "/icons/monitoring.webp",
        text: "End-to-end support across major eCommerce platforms and digital experience systems such as Sitecore, Kentico and custom-build headless setups. Delivered as an extension of internal engineering and ops teams.",
      },
    ],
    cloud: {
      title: "What does a future-proof eCommerce cloud actually look like?",
      intro: "Today’s high-growth eCommerce platforms are high-velocity. They’re gobally distributed systems that need to scale instantly, stay fast under pressure and support rapid change. Modern cloud foundations make all of that possible. Our managed services ensure your platform is ready for anything, from seasonal peaks to global expansion.",
      boxes: [
        {
          title: "High-scale cloud architecture",
          icon: "/icons/rocket.svg",
          text: "Cloud environments designed specifically for the traffic patterns and complexity of eCommerce. Built for global audiences, high throughput, headless architectures, microservices and modern container/serverless workflows.",
        },
        {
          title: "Modernisation & replatforming",
          icon: "/icons/cloud-strategy.svg",
          text: "Transformation paths that move brands away from brittle, slow or costly systems into cloud-native environments that support agility. Whether shifting from monoliths to microservices or replatforming to a new commerce engine, transitions are made with minimal trading disruption.",
        },
        {
          title: "Faster, safer feature delivery",
          icon: "/icons/lightbulb-check.svg",
          text: "Engineering pipelines that enable rapid releases without risking downtime. CI/CD automation, infrastructure as code and DevOps expertise keep deployments smooth, even during busy trading periods or out-of-hours launches.",
        },
        {
          title: "Performance, cost & scalability optimisation",
          icon: "/icons/money-saving.svg",
          text: "Continuous cloud improvements that keep stores fast and cost-efficient. From autoscaling strategies to resource right-sizing and performance tuning, optimisation ensures the platform can grow sustainably while staying responsive.",
        },
      ],
    },
    security: {
      title: "Security & Compliance for eCommerce",
      intro: "eCommerce platforms process high-value data and operate in a rapidly evolving threat landscape. We simplify the essential parts:",
      points: [
        "Regular vulnerability scans",
        "Asset monitoring",
        "Emergency patch monitoring",
        "Platform monitoring",
        "Risk prioritisation & remediation guidance",
      ],
      closer: "All in one flexible, easy-to-understand managed service.",
      image: "/icons/network-security.svg",
    },
    consultation: {
      title: "Book a free 15-minute consultation",
      subtitle: "Like what you’re hearing?",
      paras: [
        "Book a free 15-minute consultation with one of our eCommerce experts. We’ll run through your key objectives, and your current technology stack and fill in the blanks between.",
        "Ultimately, our job is to make sure you get where you’re going, so tell us the destination, and we’ll give you the map.",
      ],
      askIntro: "We’ll ask you about:",
      points: [
        "Any managed services you’re currently using",
        "Regular blockers and headaches",
        "The level of support you require (if you need support), i.e. 24/7, out-of-hours or specific windows",
        "Your current architecture and how you want it to evolve",
      ],
      closer: "Look forward to hearing from you!",
    },
    why: {
      title: "Why Our eCommerce Partners Choose Us",
      cards: [
        {
          title: "Cloud app and platform experts",
          icon: "/icons/why-bolt.svg",
          text: "Our global team boasts cloud, application and platform experts. This gives us a 360-degree perspective on your app and infrastructure.",
        },
        {
          title: "Work with a next-gen managed service provider",
          icon: "/icons/why-bolt.svg",
          text: "As an MSP on the cutting edge of technology, we’re a partner for today and tomorrow, helping you strategically assess tech trends and make smart decisions about innovation.",
        },
        {
          title: "A one-of-a-kind support service",
          icon: "/icons/why-bolt.svg",
          text: "Our full-stack, tech-enabled 24/7 support service is uniquely placed to help our partners meet the support needs of modern applications.",
        },
        {
          title: "Global reach",
          icon: "/icons/why-bolt.svg",
          text: "With offices in 4 time zones, we have the reach to support and accelerate our enterprise-level ecommerce partners and help smaller brands break new ground.",
        },
      ],
    },
    insights: {
      title: "Latest Insights from JAM",
      to: "/insights",
      variant: "plain",
    },
    glance: {
      eyebrow: "At a glance",
      title: "Just After Midnight’s support offering",
      items: [
        {
          q: "What technologies do you support?",
          a: <>We support cloud platforms (<strong>AWS, Azure, GCP, Alibaba Cloud</strong>), CMS and DXP platforms (<strong>Sitecore, Kentico, Umbraco, AEM, Optimizely, WordPress, Drupal, Magento</strong>), custom-built applications, edge/CDN networks, and third-party integrations including APIs.</>,
        },
        {
          q: "What support windows are available?",
          a: <><strong>24/7/365</strong> support, out-of-hours support and overnight support, weekends-only support, or a custom schedule built around your needs.</>,
        },
        {
          q: "What functions does your support team cover?",
          a: "Our support covers monitoring and alerting, incident management and triage, root cause analysis (RCA), SRE and DevOps support, observability, security incident response, backup and recovery, change and patch management, and third-party vendor escalation.",
        },
        {
          q: "What industries do you support?",
          a: "We work with businesses and organisations in SaaS, eCommerce, healthtech, legaltech, fintech, government, manufacturing, logistics, and digital agencies – and many more.",
        },
        {
          q: "What security accreditations do you hold?",
          a: <>We are <strong>ISO 27001</strong> certified, <strong>Cyber Essentials Plus</strong> verified, and <strong>PCI DSS</strong> compliant.</>,
        },
      ],
    },
    impacts: {
      q: "What are the impacts of incidents on teams and revenue?",
      a: "According to industry sources, downtime costs businesses between $540,000 (Splunk, The Hidden Costs of Downtime) and $2 million (New Relic, Observability Forecast 2025) per hour for many high-impact outages. Incidents also consume significant engineering capacity: the median engineering team spends 30% of its time addressing disruptions (New Relic, Observability Forecast 2024).",
      sourcesHead: "Sources",
      sources: [
        "Splunk, The Hidden Costs of Downtime (2000 Global Executives surveyed)",
        "New Relic, Observability Forecast 2025 (1,700 global technology professionals surveyed)",
        "New Relic Observability Forecast 2024 (1,700 global technology professionals surveyed)",
      ],
    },
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

function EcomConsultationForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    source: "",
    help: "",
    timezone: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (
      !values.firstName.trim() ||
      !values.lastName.trim() ||
      !values.email.trim() ||
      !values.phone.trim() ||
      !values.timezone
    ) {
      setStatus({ ok: false, text: "Please complete all required fields." });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const { ok, body } = await postJson("/api/contact", {
        name: `${values.firstName.trim()} ${values.lastName.trim()}`,
        email: values.email.trim(),
        phone: values.phone.trim(),
        source: values.source || "Not specified",
        timezone: values.timezone,
        topic: "15-minute consultation",
        message: `How can we help:\n${values.help.trim() || "eCommerce consultation request"}\n\nTimezone: ${values.timezone}\nSource: ${values.source || "Not specified"}`,
      });
      if (ok && body?.ok) {
        setStatus({
          ok: true,
          text: "Thank you! We've received your details and will be in touch shortly to book your 15-minute consultation.",
        });
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          source: "",
          help: "",
          timezone: "",
        });
      } else {
        setStatus({ ok: false, text: body?.error || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ ok: false, text: "We couldn't reach the server — please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="ecom-hs-form" onSubmit={submit} noValidate>
      <div className="ecom-hs-row ecom-hs-row--2col">
        <div className="ecom-hs-field">
          <label htmlFor="ec-fname">
            First name<span className="hs-req">*</span>
          </label>
          <input
            type="text"
            id="ec-fname"
            name="firstName"
            required
            value={values.firstName}
            onChange={update("firstName")}
            autoComplete="given-name"
          />
        </div>
        <div className="ecom-hs-field">
          <label htmlFor="ec-lname">
            Last name<span className="hs-req">*</span>
          </label>
          <input
            type="text"
            id="ec-lname"
            name="lastName"
            required
            value={values.lastName}
            onChange={update("lastName")}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="ecom-hs-row ecom-hs-row--2col">
        <div className="ecom-hs-field">
          <label htmlFor="ec-email">
            Email<span className="hs-req">*</span>
          </label>
          <input
            type="email"
            id="ec-email"
            name="email"
            required
            value={values.email}
            onChange={update("email")}
            autoComplete="email"
          />
        </div>
        <div className="ecom-hs-field">
          <label htmlFor="ec-phone">
            Phone number<span className="hs-req">*</span>
          </label>
          <input
            type="tel"
            id="ec-phone"
            name="phone"
            required
            value={values.phone}
            onChange={update("phone")}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="ecom-hs-row">
        <div className="ecom-hs-field">
          <label htmlFor="ec-source">How did you hear about us?</label>
          <div className="ecom-hs-select-wrap">
            <select
              id="ec-source"
              name="source"
              value={values.source}
              onChange={update("source")}
            >
              <option value="">Please Select</option>
              <option value="Search engine">Found us on a search engine</option>
              <option value="Recommendation">A client or partner recommended you</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Existing client">We already work with you</option>
              <option value="Event">An event or meetup</option>
              <option value="Other">Somewhere else</option>
            </select>
          </div>
        </div>
      </div>

      <div className="ecom-hs-row">
        <div className="ecom-hs-field">
          <label htmlFor="ec-help">How can we help?</label>
          <textarea
            id="ec-help"
            name="help"
            rows={4}
            value={values.help}
            onChange={update("help")}
          />
        </div>
      </div>

      <p className="ecom-hs-notice">
        We&apos;re a global team, which means we&apos;re online 24/7! To help us direct your enquiry, please pick the region that works best for your time zone.
      </p>

      <div className="ecom-hs-row">
        <div className="ecom-hs-field">
          <label htmlFor="ec-timezone">
            Your preferred time zone<span className="hs-req">*</span>
          </label>
          <div className="ecom-hs-select-wrap">
            <select
              id="ec-timezone"
              name="timezone"
              required
              value={values.timezone}
              onChange={update("timezone")}
            >
              <option value="">Please Select</option>
              <option value="UK / Europe (GMT/BST/CET)">UK &amp; Europe (GMT/BST/CET)</option>
              <option value="North America - East (EST/EDT)">North America - East (EST/EDT)</option>
              <option value="North America - West (PST/PDT)">North America - West (PST/PDT)</option>
              <option value="Asia Pacific / Singapore (SGT)">Asia Pacific / Singapore (SGT)</option>
              <option value="Australia / New Zealand (AEST/NZST)">Australia &amp; New Zealand (AEST/NZST)</option>
              <option value="Middle East / Gulf (GST)">Middle East / Gulf (GST)</option>
            </select>
          </div>
        </div>
      </div>

      <p className="ecom-hs-privacy">
        To learn how we store your information, please review our{" "}
        <Link to="/privacy-policy" className="ecom-hs-privacy-link">
          Privacy Policy
        </Link>
        .
      </p>

      <button type="submit" className="btn ecom-btn-yellow ecom-hs-submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit"}
      </button>

      {status && (
        <p className={`form-status ${status.ok ? "is-ok" : "is-error"}`} role="status" style={{ marginTop: 14 }}>
          {status.text}
        </p>
      )}
    </form>
  );
}

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
  useTitle(provider ? `${provider.pageTitle || provider.title} | Just After Midnight` : "24/7 Support | Just After Midnight");
  const { data: caseStudies } = useApi(provider?.caseStudy || provider?.cases ? "/api/case-studies" : null);
  const { data: articles } = useApi(provider?.insights ? "/api/articles" : null);
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
        provider.gap.columns ? (
          <div className="seo-intro seo-intro--columns">
            <div className="seo-intro-head reveal">
              <h2 className="seo-intro-title">{provider.gap.title}</h2>
              {provider.gap.head.map((para) => <p key={para}>{para}</p>)}
            </div>
            <div className="seo-intro-columns">
              <div className="seo-intro-col reveal">
                {provider.gap.columns.left.map((block) => (
                  <Fragment key={block.h || block.items?.[0]}>
                    {block.h && <h4>{block.h}</h4>}
                    {block.p && <p>{block.p}</p>}
                    {block.items && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                  </Fragment>
                ))}
              </div>
              <span className="seo-intro-rule" aria-hidden="true" />
              <div className="seo-intro-col reveal">
                {provider.gap.columns.right.map((block) => (
                  <Fragment key={block.h || block.items?.[0]}>
                    {block.h && <h4>{block.h}</h4>}
                    {block.p && <p>{block.p}</p>}
                    {block.items && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : provider.gap.split ? (
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
        <>
          {provider.slug === "ecommerce" && (
            <div className="global-curved-divider global-curved-divider--down" style={{ backgroundColor: "#f2f2f2" }}>
              <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none">
                <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill="#FFFFFF" />
              </svg>
            </div>
          )}
          <section className="how-it-works" style={provider.slug === "ecommerce" ? { backgroundColor: "#f2f2f2", marginTop: 0 } : undefined}>
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
                  {provider.video.closer && <p>{provider.video.closer}</p>}
                  {provider.video.cta && <Link to="/support" className="btn btn-navy btn-lg">{provider.video.cta}</Link>}
                </div>
              </div>
            </div>
          </section>
          {provider.slug === "ecommerce" && (
            <div className="global-curved-divider global-curved-divider--down" style={{ backgroundColor: "#132140" }}>
              <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none">
                <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill="#f2f2f2" />
              </svg>
            </div>
          )}
        </>
      ),

    ecomServices: provider.services && (
      <section className="ecom-services-section">
        <div className="container">
          <div className="ecom-services-head reveal">
            <h2>Our Services for eCommerce</h2>
            <p>Our unified, full-stack service keeps your revenue protected, your customers happy and your team free to focus on growth. Here's a birds-eye view.</p>
          </div>
          <div className="ecom-services-grid">
            {provider.services.map((svc) => (
              <article className="ecom-service-card reveal" key={svc.title}>
                <img src={svc.icon} alt="" className="ecom-service-icon" />
                <h3>{svc.title}</h3>
                <p>{svc.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),

    ecomCloud: provider.cloud && (
      <section className="ecom-cloud-section">
        <div className="container">
          <div className="ecom-cloud-head reveal">
            <h2>{provider.cloud.title}</h2>
            <p className="ecom-cloud-intro">{provider.cloud.intro}</p>
          </div>
          <div className="ecom-cloud-grid">
            {provider.cloud.boxes.map((box) => (
              <article className="ecom-cloud-box reveal" key={box.title}>
                <img src={box.icon} alt="" className="ecom-cloud-icon" />
                <h3>{box.title}</h3>
                <p>{box.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    ),

    ecomSecurity: provider.security && (
      <>
        <div className="global-curved-divider global-curved-divider--up" style={{ backgroundColor: "#ffffff" }}>
          <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none">
            <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill="#12203f" />
          </svg>
        </div>
        <section className="ecom-security-section">
          <div className="container">
            <div className="ecom-security-grid">
              <div className="ecom-security-copy reveal">
                <h2>{provider.security.title}</h2>
                <p>{provider.security.intro}</p>
                <ul>
                  {provider.security.points.map((pt) => (
                    <li key={pt}>
                      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="#fabd14" strokeWidth="2" />
                        <path d="M5 8l2 2 4-4" stroke="#fabd14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <p>{provider.security.closer}</p>
              </div>
              <div className="ecom-security-rule" aria-hidden="true" />
              <div className="ecom-security-media reveal">
                <img src={provider.security.image} alt="" className="ecom-security-img" />
              </div>
            </div>
          </div>
        </section>
        <div className="global-curved-divider global-curved-divider--up" style={{ backgroundColor: "#12203f" }}>
          <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none">
            <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill="#ffffff" />
          </svg>
        </div>
      </>
    ),

    ecomConsult: provider.consultation && (
      <section className="ecom-consult-section" id="consultation-form">
        <div className="container">
          <div className="ecom-consult-grid">
            <div className="ecom-consult-copy reveal">
              <h2>{provider.consultation.title}</h2>
              <h4>{provider.consultation.subtitle}</h4>
              {provider.consultation.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>{provider.consultation.askIntro}</p>
              <ul>
                {provider.consultation.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
            <div className="ecom-consult-form-wrap reveal">
              <EcomConsultationForm />
            </div>
          </div>
        </div>
      </section>
    ),

    ecomWhy: provider.why && (
      <section className="ecom-why-section">
        <div className="container">
          <h2 className="reveal">{provider.why.title}</h2>
          <div className="ecom-why-grid">
            {provider.why.cards.map((c) => (
              <article className="ecom-why-card reveal" key={c.title}>
                <img src={c.icon} alt="" className="ecom-why-icon" />
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
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
          tightHeader={provider.cases.tightHeader}
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
          padded={provider.faq.padded}
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
          titleScale={provider.coverage.titleScale}
        />
      ),

    packages: provider.packages && (
        <PackageBand
          title={provider.packages.title}
          intro={provider.packages.intro}
          introTail={provider.packages.introTail}
          introGap={provider.packages.introGap}
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

    slab2: provider.slab2 && (
        <CaseFeature
          study={(caseStudies || []).find((study) => study.slug === provider.slab2.slug)}
          variant="detail"
          split={provider.slab2.split}
        />
      ),

    insights: provider.insights && (
        <InsightsBand
          title={provider.insights.title}
          cta={provider.insights.cta}
          to={provider.insights.to}
          articles={articles || []}
          variant={provider.insights.variant}
        />
      ),

    glance: provider.glance && (
        <GlanceBand eyebrow={provider.glance.eyebrow} title={provider.glance.title} items={provider.glance.items} />
      ),

    impacts: provider.impacts && (
        <ImpactBand
          question={provider.impacts.q}
          answer={provider.impacts.a}
          sourcesHead={provider.impacts.sourcesHead}
          sources={provider.impacts.sources}
        />
      ),

    reviews: provider.reviews && <ReviewsBand />,

    faqSection: provider.faqs && (<div className="faq-section">
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
      {provider.scene === "ecom" ? (
        <section className="hero-banner ecom-hero" style={{ backgroundImage: "url(/icons/hero-ecom-bg.jpg)" }}>
          <div className="container">
            <div className="ecom-hero-row">
              <div className="ecom-hero-col">
                <p className="breadcrumb ecom-breadcrumb">
                  <Link to="/support">24/7 Support</Link> <span aria-hidden="true">/</span> {provider.name}
                </p>
                <h1 className="banner-title ecom-hero-title reveal"><span>{provider.title}</span></h1>
                <h4 className="ecom-hero-sub reveal"><span>{provider.tagline}</span></h4>
                <div className="hero-actions reveal">
                  <a href="#consultation-form" className="btn ecom-btn-yellow">GET IN TOUCH</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
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
      )}

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
