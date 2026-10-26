import Link from "next/link";
import { services, steps } from "./data";
import AnimatedHero from "./components/AnimatedHero";
import QuoteForm from "./components/QuoteForm";

export default function Home() {
  return (
    <main>
      <div className="announcement">
        B2B GARMENT MANUFACTURING · LAGOS, NIGERIA · LIVE PRODUCTION TRACKER &amp; FACTORY OS
      </div>

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
            We help fashion brands turn approved designs, patterns and specifications into
            finished garments — crafted by specialist Pattern Designers, Master Tailors and
            Quality Control Inspectors in Lagos.
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
            <span className="status-dot" /> Lagos-based · Dedicated Pattern Studio, Bulk Sewing
            Lines &amp; AQL 2.5 Quality Control
          </div>
        </div>
        <div className="hero-visual">
          <AnimatedHero />
          <div className="vertical-label">
            MISS KUDI PRODUCTIONS — APPAREL MANUFACTURING
          </div>
        </div>
      </section>

      <section className="intro section-wrap" id="about">
        <div className="section-kicker">01 / WHO WE ARE</div>
        <div className="intro-content">
          <h2>
            Built for brands.
            <br />
            <span>Ready for the next run.</span>
          </h2>
          <div className="intro-body">
            <p>
              Miss Kudi Productions is a Lagos-based garment manufacturing partner for labels
              that need to produce collections in volume with predictable lead times and
              transparent floor telemetry.
            </p>
            <p>
              Bring your design, print, pattern or technical specifications. Every order is
              assigned a dedicated <strong>Pattern Designer</strong>,{" "}
              <strong>Master Tailor Lead</strong>, and{" "}
              <strong>Quality Control Inspector</strong> from brief to dispatch.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <Link className="underlined-link" href="#quote">
                Calculate MOQ &amp; Pro-Forma Quote <span>↗</span>
              </Link>
              <Link className="underlined-link" href="/workspace">
                Open Factory Operations OS <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
            Production services shaped around your garment, approved specifications and order
            requirements.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div
                className="service-image"
                style={{ backgroundImage: `url("${service.image}")` }}
                role="img"
                aria-label={service.alt}
              >
                <span className="service-number">{service.number}</span>
              </div>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="capability-note">
          Service scope, minimum quantities and timelines are confirmed for each garment and
          order.
        </p>
      </section>

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
              A clear 5-stage pipeline connects our Pattern Studio, Cutting Tables, Sewing
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
        </div>
      </section>

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
        </div>
        <QuoteForm />
      </section>
    </main>
  );
}
