import { Link } from "react-router-dom";
import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import ReviewsBand from "../components/ReviewsBand";
import InsightsBand from "../components/InsightsBand";

const HOW_IT_WORKS_POINTS = [
  "A discovery session to understand your business objectives, key issues and in-house skills",
  "An architecture review to understand your stack, project and integrations",
  "Developing an approach that is right for you, wherever you are in the cloud journey",
  "Delivering on your objectives, whether you’re good to go on alone or you want to tag us in",
];

const CONSULTING_SERVICES = [
  {
    icon: "/icons/aws-cp-consulting-puzzle.svg",
    title: "Amazon Web Services (AWS) Well-Architected Review",
    to: "/cloud/cloud-consulting/aws-well-architected-review",
    text: "Partners on AWS can benefit from an AWS Well-Architected Review, a free consultation leading to smart, actionable recommendations.",
  },
  {
    icon: "/icons/cloud-cost-reducing.svg",
    title: "Cloud Optimisation Consulting Service",
    to: "/cloud/cloud-consulting/cost-optimisation",
    text: "We help partners reduce TCO and access true scalability, optimising processes, governance and tooling in-line with long-term objectives.",
  },
  {
    icon: "/icons/sa-icon-security.png",
    title: "Cloud Security Consulting Service",
    to: "#site-footer",
    text: "We give you visibility of your services’ risks and vulnerabilities and build resolutions that fit within your overall strategy.",
  },
  {
    icon: "/icons/sa-icon-migration.png",
    title: "Cloud Migration Consultancy Services",
    to: "/cloud",
    text: "We can get you started on your cloud journey if you’re making the move from on-prem or from one provider to another.",
  },
  {
    icon: "/icons/clock-arrow-yellow-e1722955491448.webp",
    title: "Cloud Modernisation Services",
    to: "/cloud",
    text: "We help you modernise your architecture and access the benefits of cloud-native technologies such as serverless or containers.",
  },
  {
    icon: "/icons/cloud-architecture.svg",
    title: "Cloud Architecture Design Services",
    to: "/cloud/solution-architecture",
    text: "We build brand new cloud-native infrastructures using the latest cloud technologies and methods.",
  },
];

const CONSULTING_REVIEWS = [
  {
    slug: "banyan-tree",
    client: "Banyan Tree",
    role: "Head, Information Technology",
    quote: "Quick and fast support and consulting on the overall web, DevOps and hosting needs. Very helpful as always.",
    companyUrl: "https://www.banyantree.com/",
    cta: false,
  },
  {
    slug: "dla-piper",
    client: "DLA Piper",
    role: "CEO",
    quote: "I would not hesitate to recommend JAM based on the service they have provided to us. They have been very responsive and have done so in a positive and professional fashion. The team clearly have a thorough knowledge of Sitecore and AWS and have been able to explain things to us in language we can understand.",
    companyUrl: "https://www.dlapiper.com/en",
    to: "https://www.justaftermidnight247.com/case-study/dla-piper/",
  },
  {
    slug: "emperor",
    client: "Emperor",
    role: "Technical Director",
    quote: "Just After Midnight (JAM) has been providing us with 24/7/365 setup and support services to deliver the many financial reporting websites that we deliver each year. We count them as one of our critical trusted partners.",
    companyUrl: "https://emperor.works/",
    to: "https://www.justaftermidnight247.com/case-study/emperor/",
  },
  {
    slug: "the-body-coach",
    client: "The Body Coach",
    role: "CEO",
    quote: "JAM’s excellent first-line service means no more late-night wake-up calls – responding to our clients and resolving issues any hour of the day.",
    companyUrl: "https://www.thebodycoach.com/",
    to: "https://www.justaftermidnight247.com/case-study/the-body-coach-app/",
  },
];

function CurveUp({ fill = "#f2f2f2" }) {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none" preserveAspectRatio="none">
        <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill={fill} />
      </svg>
    </div>
  );
}

function CurveDown({ fill }) {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
        <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill={fill} />
      </svg>
    </div>
  );
}

function ServiceCard({ service }) {
  const external = /^https?:\/\//i.test(service.to);
  const anchor = service.to.startsWith("#");
  const title = (
    <>
      {service.title} <span aria-hidden="true">➔</span>
    </>
  );
  return (
    <article className="cp-aws-icons__card reveal" style={{ backgroundColor: "#212E4B" }}>
      <img src={service.icon} width="80" height="80" alt="" loading="lazy" decoding="async" />
      <h3>
        {external || anchor ? <a href={service.to}>{title}</a> : <Link to={service.to}>{title}</Link>}
      </h3>
      <p>{service.text}</p>
    </article>
  );
}

export default function CloudConsulting() {
  useTitle("Cloud Consulting | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      {/* SECTION 1: HERO BANNER */}
      <section
        className="cloud-hero cloud-hero--photo cp-aws-hero"
        style={{
          background: "#0d1d3d",
        }}
        aria-labelledby="consulting-title"
      >
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="consulting-title">
              <span style={{ color: "#ffffff" }}>
                <strong>Cloud Strategy &amp; Planning Consulting</strong>
              </span>
            </h1>
            <p className="cloud-hero__sub">
              <span style={{ color: "#ffffff" }}>Even cloud journeys need a sat nav</span>
            </p>
            <div className="buttons">
              <a
                href="#site-footer"
                className="btn btn-primary"
                style={{ backgroundColor: "#fabd14", color: "#12203f" }}
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO */}
      <section className="cp-aws-intro" style={{ padding: "50px 0 20px" }} aria-labelledby="consulting-lead-title">
        <div className="cost-container">
          <div className="reveal" style={{ maxWidth: "1000px" }}>
            <h2 id="consulting-lead-title" style={{ fontSize: "36px", fontWeight: 800, color: "#12203f", marginBottom: "18px" }}>
              Cloud Strategy Consulting
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "28px", color: "var(--navy-text-muted)", marginBottom: "16px" }}>
              Cloud-native technologies offer unique scalability, agility and scope for innovation. But for many, the full potential of the cloud lies just across the knowledge gap.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "28px", color: "var(--navy-text-muted)", margin: 0 }}>
              Our team of cloud-native AWS, Azure, GCP and Alibaba Cloud experts work with scale-ups and enterprises to bring the full benefits of cloud-native technologies. From migration to solution architecture, implementing serverless or reducing TCO, our strategy gets you where you’re going.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT IT IS & HOW IT WORKS */}
      <section className="cp-aws-columns" style={{ backgroundColor: "#ffffff", padding: "40px 0 60px" }}>
        <div className="cost-container">
          <div className="cp-aws-columns__grid" style={{ alignItems: "flex-start", gap: "50px" }}>
            {/* What it is */}
            <div className="cp-aws-columns__col reveal" style={{ flex: 1 }}>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#12203f", marginBottom: "16px" }}>
                What it is
              </h3>
              <p style={{ fontSize: "16px", lineHeight: "28px", color: "var(--navy-text-muted)", marginBottom: "16px" }}>
                Cloud strategy and planning means identifying a destination and drawing up a map. We work with you to discover the opportunities, savings and transformations that will power your growth, then we give you the how.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "28px", color: "#12203f", fontWeight: 600, marginBottom: "10px" }}>
                We provide:
              </p>
              <ul style={{ paddingLeft: "20px", display: "grid", gap: "10px", marginBottom: "20px" }}>
                <li style={{ fontSize: "16px", lineHeight: "26px", color: "var(--navy-text-muted)" }}>Cloud transformation consulting</li>
                <li style={{ fontSize: "16px", lineHeight: "26px", color: "var(--navy-text-muted)" }}>Cloud optimisation consulting</li>
                <li style={{ fontSize: "16px", lineHeight: "26px", color: "var(--navy-text-muted)" }}>Cloud security consulting</li>
                <li style={{ fontSize: "16px", lineHeight: "26px", color: "var(--navy-text-muted)" }}>And cloud migration and modernisation consulting</li>
              </ul>
              <p style={{ fontSize: "16px", lineHeight: "28px", color: "var(--navy-text-muted)", marginBottom: "12px" }}>
                Whatever provider you’re with, or wherever you’re at in your journey, we take you to the finish line.
              </p>
              <p style={{ fontSize: "16px", lineHeight: "28px", fontWeight: 600, color: "#12203f" }}>
                Just think of us as your cloud journey’s sat nav!
              </p>
            </div>

            {/* Separator */}
            <span className="cp-aws-columns__rule" aria-hidden="true" style={{ width: "1px", background: "#e2e8f0", alignSelf: "stretch" }} />

            {/* How it works */}
            <div className="cp-aws-columns__col reveal" style={{ flex: 1 }}>
              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#12203f", marginBottom: "16px" }}>
                How it works
              </h3>
              <p style={{ fontSize: "16px", lineHeight: "28px", color: "var(--navy-text-muted)", marginBottom: "20px" }}>
                We work with you to build up a detailed picture of your business objectives, in-house skills and cloud environment. We then deliver insight and action depending on where you’re aiming at. This breaks down into:
              </p>

              <ul className="seo-intro-points seo-intro-points--marked cost-moon-list">
                {HOW_IT_WORKS_POINTS.map((pt, idx) => (
                  <li key={idx} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "18px" }}>
                    <img src="/icons/sa-list-mark.svg" alt="" width="22" height="22" style={{ flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ fontSize: "15px", lineHeight: "24px", color: "#334155" }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CURVED DIVIDER DOWN INTO NAVY */}
      <div className="cp-aws-divider-navy">
        <CurveDown fill="#ffffff" />
      </div>

      {/* SECTION 5: OUR SERVICES (ICON GRID ON DARK NAVY) */}
      <section className="cp-aws-icons" style={{ backgroundColor: "#12203f" }} aria-labelledby="consulting-services-title">
        <div className="cost-container">
          <div className="cp-aws-icons__head reveal">
            <h2 id="consulting-services-title" style={{ color: "#ffffff", textAlign: "center" }}>
              <strong>Our Services</strong>
            </h2>
          </div>
          <div className="cp-aws-icons__grid">
            {CONSULTING_SERVICES.map((service) => (
              <ServiceCard service={service} key={service.title} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: REVIEWS */}
      <div className="cp-aws-reviews">
        <ReviewsBand reviews={CONSULTING_REVIEWS} />
      </div>

      {/* SECTION 7: CURVED DIVIDER INTO NAVY */}
      <div className="cp-aws-divider-navy">
        <CurveDown fill="#ffffff" />
      </div>

      {/* SECTION 8 & 9: SOME OF THE PROVIDERS WE WORK WITH */}
      <section
        style={{
          backgroundColor: "rgb(18, 32, 63)",
          padding: "60px 0 80px",
        }}
        aria-labelledby="providers-worked-with-title"
      >
        <div className="cost-container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2
              id="providers-worked-with-title"
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              SOME OF THE PROVIDERS WE WORK WITH
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "40px",
              alignItems: "stretch",
            }}
          >
            {/* AWS */}
            <article
              className="reveal"
              style={{
                background: "#212E4B",
                borderRadius: "12px",
                padding: "36px 28px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <img src="/icons/sa-logo-aws.png" alt="AWS" style={{ maxWidth: "150px", maxHeight: "85px", objectFit: "contain" }} />
              </div>
              <h3 style={{ color: "#fabd14", fontSize: "19px", fontWeight: 800, marginBottom: "14px", textTransform: "uppercase" }}>
                AWS CLOUD CONSULTING
              </h3>
              <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: "25px", fontWeight: 300, margin: 0 }}>
                We’ve helped global brands, and governments, align their AWS cloud environments with overall business strategy.
              </p>
            </article>

            {/* Azure */}
            <article
              className="reveal"
              style={{
                background: "#212E4B",
                borderRadius: "12px",
                padding: "36px 28px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <img src="/icons/sa-logo-azure.png" alt="Azure" style={{ maxWidth: "150px", maxHeight: "85px", objectFit: "contain" }} />
              </div>
              <h3 style={{ color: "#fabd14", fontSize: "19px", fontWeight: 800, marginBottom: "14px", textTransform: "uppercase" }}>
                AZURE CLOUD CONSULTING
              </h3>
              <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: "25px", fontWeight: 300, margin: 0 }}>
                We’ve consulted with companies across the world, and in a range of verticals, on transforming their Azure solutions.
              </p>
            </article>

            {/* GCP */}
            <article
              className="reveal"
              style={{
                background: "#212E4B",
                borderRadius: "12px",
                padding: "36px 28px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <img src="/icons/sa-logo-gcp.png" alt="GCP" style={{ maxWidth: "150px", maxHeight: "85px", objectFit: "contain" }} />
              </div>
              <h3 style={{ color: "#fabd14", fontSize: "19px", fontWeight: 800, marginBottom: "14px", textTransform: "uppercase" }}>
                GCP CLOUD CONSULTING
              </h3>
              <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: "25px", fontWeight: 300, margin: 0 }}>
                We help partners take advantage of one of the most innovative public cloud solutions on the market.
              </p>
            </article>

            {/* Alibaba Cloud */}
            <article
              className="reveal"
              style={{
                background: "#212E4B",
                borderRadius: "12px",
                padding: "36px 28px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <img src="/icons/sa-logo-alibaba.png" alt="Alibaba Cloud" style={{ maxWidth: "150px", maxHeight: "85px", objectFit: "contain" }} />
              </div>
              <h3 style={{ color: "#fabd14", fontSize: "19px", fontWeight: 800, marginBottom: "14px", textTransform: "uppercase" }}>
                ALIBABA CLOUD CONSULTING
              </h3>
              <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: "25px", fontWeight: 300, margin: 0 }}>
                We help our partners adapt their cloud strategy to new markets through our Alibaba Cloud consulting service.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 10: INSIGHTS BAND */}
      <div className="cp-aws-insights">
        <InsightsBand
          title="Latest Insights from JAM"
          articles={articles || []}
          variant="navy"
        />
      </div>

      <CurveDown fill="#f0f0f0" />
    </>
  );
}
