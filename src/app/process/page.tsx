import Link from "next/link";
import { processStages } from "../data";

export default function Process() {
  return (
    <main>
      {/* Editorial Hero */}
      <section className="marketing-hero section-wrap">
        <div className="marketing-hero-grid">
          <div>
            <div className="section-kicker">03 / HOW WE WORK · 5-STAGE PIPELINE</div>
            <h1 style={{ marginTop: 16 }}>
              From your brief
              <br />
              to <em>bulk production.</em>
            </h1>
            <p className="hero-description" style={{ maxWidth: "56ch" }}>
              Every Miss Kudi Productions order flows through five documented, quality-gated
              stages — connecting our Pattern Studio, Cutting Tables, Sewing Lines and AQL 2.5
              Finishing Bay with live telemetry in your Order Tracker.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/quote">
                Start Stage 01 Brief <span>↗</span>
              </Link>
              <Link
                className="button button-light"
                href="/tracker"
                style={{ border: "1px solid var(--line)" }}
              >
                Inspect Live Order Tracker <span>⌖</span>
              </Link>
            </div>
          </div>

          <figure className="marketing-hero-figure">
            <img
              src="/images/pattern-cutting-studio.jpg"
              alt="Pattern designer and cutting master inspecting graded CAD garment blueprints and fabric bolts"
              width={960}
              height={680}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="image-caption">
              <span>STAGE 02 · CAD PATTERN &amp; MARKER STUDIO</span>
              <span className="mono">94%+ MARKER EFFICIENCY · XS–XXL</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Detailed 5-Stage Visual Timeline */}
      <section className="section-wrap" style={{ paddingTop: 72, paddingBottom: 96, borderTop: "1px solid var(--line)" }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker">STAGE-BY-STAGE EXECUTION</div>
            <h2>
              Transparent milestones at
              <br />
              <em>every station on the floor.</em>
            </h2>
          </div>
          <p>
            Each stage is signed off by a dedicated specialist before your order advances to the
            next station.
          </p>
        </div>

        <div className="process-timeline-stack">
          {processStages.map((stage, idx) => (
            <article key={stage.number} className="process-stage-card">
              <div className="process-stage-copy">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                  <span className="mkp-badge mkp-badge-olive">{stage.stageCode}</span>
                  <span className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)" }}>
                    ⏱ {stage.duration}
                  </span>
                </div>
                <h3 style={{ fontSize: 24, margin: "0 0 6px" }}>
                  {stage.number}. {stage.title}
                </h3>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#6c5d4c", marginBottom: 12 }}>
                  Lead Station: {stage.leadRole}
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 16 }}>
                  {stage.copy}
                </p>
                <div className="ticket-label" style={{ marginBottom: 8 }}>
                  MANDATORY STAGE DELIVERABLES &amp; QC GATES
                </div>
                <ul className="service-deliverables-list">
                  {stage.checkpoints.map((cp) => (
                    <li key={cp}>{cp}</li>
                  ))}
                </ul>
              </div>

              <figure className="process-stage-figure">
                <img
                  src={stage.image}
                  alt={stage.alt}
                  width={640}
                  height={440}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <figcaption className="image-caption">
                  <span>{stage.stageCode}</span>
                  <span className="mono">{stage.duration}</span>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            padding: 32,
            background: "var(--ink)",
            color: "var(--paper)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="section-kicker" style={{ color: "#d4c8b8" }}>
              READY TO ENTER STAGE 01?
            </div>
            <h3 style={{ fontSize: 26, margin: "8px 0 6px", color: "#fff" }}>
              Generate your instant Job Code &amp; Pro-Forma Quote.
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: "#dfd9ce" }}>
              Includes live MOQ volume discounts, fabric consumption yardage and a printable
              Factory Job Ticket.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="button button-light" href="/quote">
              Configure Production Quote <span>↗</span>
            </Link>
            <Link
              className="button"
              href="/size-charts"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff" }}
            >
              Size &amp; Ratio Calculator <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
