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
  const [flagshipPlant, ...secondaryPlants] = facilityHighlights;

  return (
    <main>
      <div className="announcement">
        B2B GARMENT MANUFACTURING · 1 ALAWODE STREET, LAGOS, NIGERIA · 3 PRODUCTION PLANTS · AQL 2.5 QUALITY CERTIFIED
      </div>

      {/* LAYOUT FAMILY A: Asymmetrical Split Hero + Telemetry Showcase */}
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
            retail-ready garments. Every run is executed by specialist Pattern Designers, Cutting
            Masters, Master Tailors and AQL 2.5 Quality Control Inspectors across three Lagos
            facilities.
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
            <span className="status-dot" /> 1 Alawode Street, Lagos, Nigeria · Yaba Flagship Plant,
            Victoria Island Atelier &amp; Ikeja Export Depot
          </div>
        </div>
        <div className="hero-visual">
          <AnimatedHero />
          <div className="vertical-label">
            MISS KUDI PRODUCTIONS · APPAREL MANUFACTURING
          </div>
        </div>
      </section>

      {/* LAYOUT FAMILY B: Architectural Manifesto + Collapsed Hairline Telemetry Ledger */}
      <section className="intro section-wrap" id="about">
        <div className="taste-manifesto-grid">
          <div className="taste-manifesto-index">
            <span className="section-kicker mono">01 / MANIFESTO</span>
            <span className="taste-index-rule" />
            <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>
              LAGOS · EST. 2018
            </span>
          </div>

          <div className="taste-manifesto-statement">
            <h2>
              Built for brands.
              <br />
              <span>Ready for the next run.</span>
            </h2>
            <div className="taste-hairline-ledger" style={{ marginTop: 32 }}>
              <div className="taste-ledger-cell">
                <span className="ticket-label">MONTHLY CAPACITY</span>
                <strong className="mono">35,500+ Pcs</strong>
                <small>Across 3 Lagos facilities</small>
              </div>
              <div className="taste-ledger-cell">
                <span className="ticket-label">QUALITY BENCHMARK</span>
                <strong className="mono">99.4% Yield</strong>
                <small>AQL 2.5 36-point inspection</small>
              </div>
              <div className="taste-ledger-cell">
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
              <strong>Quality Control Inspector</strong>. Live unit-by-unit progress is visible at
              every step in your brand&apos;s Order Tracker.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 12 }}>
              <Link className="underlined-link" href="/about">
                Explore Our 3 Lagos Facilities <span>↗</span>
              </Link>
              <Link className="underlined-link" href="#quote">
                Calculate MOQ &amp; Pro-Forma Quote <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LAYOUT FAMILY C: 12-Column Asymmetrical Spanning Bento Grid (7+5 / 5+7, 0 Orphan Cells) */}
      <section className="capabilities section-wrap" id="capabilities">
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">02 / CAPABILITIES BENTO</div>
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

        <div className="taste-bento-grid">
          {services.map((service, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <article
                className={`taste-bento-card ${isWide ? "bento-span-7 bento-horizontal" : "bento-span-5"}`}
                key={service.number}
              >
                <figure className="taste-bento-figure">
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={640}
                    height={460}
                    loading="lazy"
                    decoding="async"
                    className="taste-bento-img"
                  />
                  <span className="service-number mono">{service.number}</span>
                  <span className="service-moq-pill mono">{service.moqLabel}</span>
                </figure>
                <div className="taste-bento-body">
                  <div className="service-role-kicker mono">{service.artisanRole}</div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <ul className="service-deliverables-list">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="taste-bento-footer mono">
                    <span>{service.leadTimeLabel}</span>
                    <Link href="/quote">Configure Run →</Link>
                  </div>
                </div>
              </article>
            );
          })}
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

      {/* LAYOUT FAMILY D: Full-Width Editorial Specification Index Ledger */}
      <section className="section-wrap" style={{ paddingTop: 92, paddingBottom: 92 }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">03 / SILHOUETTE &amp; GSM SPECIFICATION INDEX</div>
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

        <div className="taste-spec-index-ledger">
          {garmentCategories.map((cat, idx) => (
            <article key={cat.title} className="taste-spec-row">
              <div className="taste-spec-num mono">0{idx + 1}</div>
              <div className="taste-spec-title-col">
                <span className="taste-spec-tag mono">{cat.tag}</span>
                <h3>{cat.title}</h3>
              </div>
              <div className="taste-spec-desc-col">
                <p>{cat.description}</p>
                <div className="taste-spec-pills mono">
                  <span>{cat.gsmRange}</span>
                  <strong>{cat.moq}</strong>
                </div>
              </div>
              <figure className="taste-spec-thumb">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  width={360}
                  height={240}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </article>
          ))}
        </div>
      </section>

      {/* LAYOUT FAMILY E: Dark Architectural Blueprint Pipeline */}
      <section className="process-section" id="process">
        <div className="process-inner section-wrap">
          <div className="section-kicker mono">04 / FIVE-STAGE FLOOR PIPELINE</div>
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
          <div className="taste-blueprint-steps">
            {steps.map(([number, title, copy]) => (
              <article className="taste-blueprint-step" key={number}>
                <div className="taste-blueprint-top mono">
                  <span>STAGE {number}</span>
                  <span>AQL GATE ✓</span>
                </div>
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

      {/* LAYOUT FAMILY F: Asymmetrical Flagship Spotlight (1 Dominant + 2 Stacked Secondary) */}
      <section
        className="section-wrap"
        style={{ paddingTop: 92, paddingBottom: 92, background: "#f2ede4" }}
      >
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">05 / LAGOS MANUFACTURING NETWORK</div>
            <h2>
              Three specialized plants.
              <br />
              <em>One unified quality standard.</em>
            </h2>
          </div>
          <p>
            Dedicated facilities across Yaba, Victoria Island and Ikeja for pattern development,
            bulk sewing and export finishing.
          </p>
        </div>

        <div className="taste-plant-spotlight-grid">
          {/* Dominant Left Flagship Plant */}
          <article className="taste-plant-flagship">
            <figure className="taste-plant-flagship-figure">
              <img
                src={flagshipPlant.image}
                alt={flagshipPlant.alt}
                width={840}
                height={520}
                loading="lazy"
                decoding="async"
              />
              <span className="facility-code-badge mono">{flagshipPlant.code}</span>
            </figure>
            <div className="taste-plant-flagship-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <h3>{flagshipPlant.name}</h3>
                <span className="facility-location mono">{flagshipPlant.location}</span>
              </div>
              <p>{flagshipPlant.focus}</p>
              <div className="facility-metrics-row mono">
                <span>{flagshipPlant.machines}</span>
                <strong>{flagshipPlant.monthlyCapacity}</strong>
              </div>
            </div>
          </article>

          {/* Stacked Right Atelier & Finishing Depot */}
          <div className="taste-plant-secondary-stack">
            {secondaryPlants.map((plant) => (
              <article key={plant.code} className="taste-plant-secondary-card">
                <figure className="taste-plant-secondary-figure">
                  <img
                    src={plant.image}
                    alt={plant.alt}
                    width={420}
                    height={300}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="facility-code-badge mono">{plant.code}</span>
                </figure>
                <div className="taste-plant-secondary-body">
                  <span className="facility-location mono">{plant.location}</span>
                  <h3>{plant.name}</h3>
                  <p>{plant.focus}</p>
                  <div className="facility-metrics-row mono">
                    <span>{plant.machines}</span>
                    <strong>{plant.monthlyCapacity}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 / START A CONVERSATION + LIVE QUOTE CALCULATOR */}
      <section className="quote-section section-wrap" id="quote">
        <div className="quote-copy">
          <div className="section-kicker mono">06 / START A CONVERSATION</div>
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
              <strong>1 Alawode Street, Lagos, Nigeria · Global Export Ready</strong>
              <span>
                B2B Partner Volume Tiers (3%–18% efficiency) · Live Job Code Tracking
              </span>
            </div>
          </div>

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
