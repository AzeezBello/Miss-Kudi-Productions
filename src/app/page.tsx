import Link from "next/link";
import {
  facilityHighlights,
  garmentCategories,
  productionFaqs,
  services,
  steps,
} from "./data";
import AnimatedHero from "./components/AnimatedHero";
import QuoteForm from "./components/QuoteForm";

export default function Home() {
  return (
    <main>
      <div className="announcement">
        B2B GARMENT MANUFACTURING · LAGOS, NIGERIA · 3 PRODUCTION PLANTS · LIVE ORDER TRACKER &amp; FACTORY OS
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> A PRODUCTION PARTNER FOR FASHION BRANDS
          </p>
          <h1>
            Your designs.
            <br />
            Our expertise.
            <br />
            <em>Production at scale.</em>
          </h1>
          <p className="hero-description">
            We help fashion labels turn approved designs, patterns and technical packs into
            retail-ready garments — crafted by specialist Pattern Designers, Cutting Masters,
            Master Tailors and AQL 2.5 Quality Control Inspectors across three Lagos facilities.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="#quote">
              Instant Quote &amp; Job Ticket <span>↗</span>
            </Link>
            <Link
              className="button button-light"
              href="/tracker"
              style={{ border: "1px solid var(--line)" }}
            >
              Track Production Run <span>⌖</span>
            </Link>
            <Link className="text-link" href="/size-charts">
              Size &amp; Ratio Calculator <span>→</span>
            </Link>
          </div>
          <div className="hero-note">
            <span className="status-dot" /> Lagos, Nigeria · Yaba Flagship Plant, Victoria Island
            Atelier &amp; Ikeja Export Depot
          </div>
        </div>
        <div className="hero-visual">
          <AnimatedHero />
          <div className="vertical-label">
            MISS KUDI PRODUCTIONS — APPAREL MANUFACTURING
          </div>
        </div>
      </section>

      {/* 01 / WHO WE ARE + EDITORIAL SPLIT VISUAL */}
      <section className="intro section-wrap" id="about">
        <div className="section-kicker">01 / WHO WE ARE</div>
        <div className="intro-content">
          <div>
            <h2>
              Built for brands.
              <br />
              <span>Ready for the next run.</span>
            </h2>
            <div className="editorial-stats-grid" style={{ marginTop: 28 }}>
              <div className="editorial-stat-card">
                <span className="ticket-label">MONTHLY CAPACITY</span>
                <strong className="mono">35,500+ Pcs</strong>
                <small>Across 3 Lagos facilities</small>
              </div>
              <div className="editorial-stat-card">
                <span className="ticket-label">QUALITY BENCHMARK</span>
                <strong className="mono">99.4% Yield</strong>
                <small>AQL 2.5 36-point inspection</small>
              </div>
              <div className="editorial-stat-card">
                <span className="ticket-label">MOQ FLEXIBILITY</span>
                <strong className="mono">50 – 5,000+</strong>
                <small>Units per style (XS–XXL)</small>
              </div>
            </div>
          </div>
          <div className="intro-body">
            <p>
              Miss Kudi Productions is an industrial garment manufacturing partner in Lagos,
              Nigeria, built for emerging and established fashion labels that demand consistent
              stitching, accurate grading, and predictable delivery windows.
            </p>
            <p>
              Every production order is assigned a dedicated{" "}
              <strong>Pattern Designer</strong>, <strong>Cutting Master</strong>,{" "}
              <strong>Master Tailor Lead</strong>, and{" "}
              <strong>Quality Control Inspector</strong> — with live unit-by-unit progress
              visible in your brand&apos;s Order Tracker.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <Link className="underlined-link" href="/about">
                Explore Our 3 Lagos Facilities <span>↗</span>
              </Link>
              <Link className="underlined-link" href="/workspace">
                Open Factory Operations OS <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 / WHAT WE DO — SEMANTIC <figure> CARDS WITH <img loading="lazy"> */}
      <section className="capabilities section-wrap" id="capabilities">
        <div className="section-heading">
          <div>
            <div className="section-kicker">02 / WHAT WE DO</div>
            <h2>
              Manufacturing that
              <br />
              <em>moves your brand forward.</em>
            </h2>
          </div>
          <p>
            End-to-end garment production shaped around your technical packs, fabric
            specifications and retail launch calendar.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card-v2" key={service.number}>
              <figure className="service-figure">
                <img
                  src={service.image}
                  alt={service.alt}
                  width={600}
                  height={440}
                  loading="lazy"
                  decoding="async"
                  className="service-card-img"
                />
                <span className="service-number">{service.number}</span>
                <span className="service-moq-pill mono">{service.moqLabel}</span>
              </figure>
              <div className="service-copy">
                <div className="service-role-kicker">{service.artisanRole}</div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <ul className="service-deliverables-list">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p className="capability-note" style={{ margin: 0 }}>
            Service scope, minimum quantities and timelines are confirmed for each garment and
            order.
          </p>
          <Link href="/services" className="button button-dark">
            Explore Full Capabilities &amp; Specs <span>→</span>
          </Link>
        </div>
      </section>

      {/* 02B / GARMENT CATEGORIES WE MANUFACTURE */}
      <section className="section-wrap" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker">GARMENT SPECIALIZATIONS</div>
            <h2>
              Engineered for every
              <br />
              <em>silhouette &amp; fabric weight.</em>
            </h2>
          </div>
          <p>
            From 480 GSM heavyweight streetwear fleece to delicate bias-cut silk resortwear and
            structured suiting.
          </p>
        </div>

        <div className="garment-category-grid">
          {garmentCategories.map((cat) => (
            <article key={cat.title} className="garment-category-card">
              <figure className="garment-category-figure">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  width={540}
                  height={380}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="garment-category-tag mono">{cat.tag}</figcaption>
              </figure>
              <div className="garment-category-body">
                <div className="garment-category-meta">
                  <span>{cat.gsmRange}</span>
                  <strong className="mono">{cat.moq}</strong>
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 / HOW WE WORK — 5-STAGE PIPELINE */}
      <section className="process-section" id="process">
        <div className="process-inner section-wrap">
          <div className="section-kicker">03 / HOW WE WORK</div>
          <div className="process-heading">
            <h2>
              From your brief
              <br />
              to <em>bulk production.</em>
            </h2>
            <p>
              A transparent 5-stage pipeline connects our Pattern Studio, Cutting Tables, Sewing
              Lines and Quality Control Bays with live status tracking for your brand.
            </p>
          </div>
          <div className="steps">
            {steps.map(([number, title, copy]) => (
              <article className="step" key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 42, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link className="button button-light" href="/process">
              Inspect Detailed 5-Stage Workflow <span>↗</span>
            </Link>
            <Link
              className="button"
              href="/tracker"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff" }}
            >
              Open Live Order Tracker <span>⌖</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 03B / THREE LAGOS PRODUCTION FACILITIES */}
      <section
        className="section-wrap"
        style={{ paddingTop: 88, paddingBottom: 88, background: "#f2ede4" }}
      >
        <div className="section-heading">
          <div>
            <div className="section-kicker">LAGOS MANUFACTURING NETWORK</div>
            <h2>
              Three specialized plants.
              <br />
              <em>One unified Factory OS.</em>
            </h2>
          </div>
          <p>
            Every facility is connected to our Neon Serverless + Clerk RBAC production telemetry
            for real-time visibility.
          </p>
        </div>

        <div className="facility-showcase-grid">
          {facilityHighlights.map((plant) => (
            <article key={plant.code} className="facility-showcase-card">
              <figure className="facility-figure">
                <img
                  src={plant.image}
                  alt={plant.alt}
                  width={600}
                  height={380}
                  loading="lazy"
                  decoding="async"
                />
                <span className="facility-code-badge mono">{plant.code}</span>
              </figure>
              <div className="facility-card-body">
                <h3>{plant.name}</h3>
                <p className="facility-location">{plant.location}</p>
                <p>{plant.focus}</p>
                <div className="facility-metrics-row">
                  <span>{plant.machines}</span>
                  <strong className="mono">{plant.monthlyCapacity}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 04 / START A CONVERSATION + LIVE QUOTE CALCULATOR */}
      <section className="quote-section section-wrap" id="quote">
        <div className="quote-copy">
          <div className="section-kicker">04 / START A CONVERSATION</div>
          <h2>
            Have a collection
            <br />
            ready for <em>production?</em>
          </h2>
          <p>
            Configure your garment category, volume and size ratio to preview an instant
            pro-forma estimate, fabric yardage requirement and printable Production Job Ticket.
          </p>
          <div className="quote-detail">
            <span className="detail-mark">↗</span>
            <div>
              <strong>Artisan-Led Production Lines</strong>
              <span>
                Assigned Pattern Designer · Master Tailor Lead · AQL 2.5 Quality Control
              </span>
            </div>
          </div>
          <div className="quote-detail">
            <span className="detail-mark">⌖</span>
            <div>
              <strong>Lagos, Nigeria · Global Export Ready</strong>
              <span>
                B2B Partner Volume Tiers (3%–18% efficiency) · Live Job Code Tracking
              </span>
            </div>
          </div>

          {/* Native Exclusive Accordion FAQ — modern-web-guidance: html (<details name="...">) */}
          <div className="faq-accordion-stack" style={{ marginTop: 32 }}>
            <div className="ticket-label" style={{ marginBottom: 10 }}>
              FREQUENTLY ASKED PRODUCTION QUESTIONS
            </div>
            {productionFaqs.map((faq, idx) => (
              <details
                key={faq.question}
                name="home-production-faq"
                className="mkp-accordion-item"
                open={idx === 0}
              >
                <summary className="mkp-accordion-summary">{faq.question}</summary>
                <div className="mkp-accordion-content">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
        <QuoteForm />
      </section>
    </main>
  );
}
