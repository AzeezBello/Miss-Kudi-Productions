import Link from "next/link";
import { facilityHighlights } from "../data";
import { INITIAL_ARTISANS, ARTISAN_ROLE_LABELS } from "../lib/production-os";

export default function About() {
  const leadSpecialists = INITIAL_ARTISANS.slice(0, 6);

  return (
    <main>
      {/* Editorial Hero Banner */}
      <section className="marketing-hero section-wrap">
        <div className="marketing-hero-grid">
          <div>
            <div className="section-kicker">01 / ABOUT MISS KUDI PRODUCTIONS</div>
            <h1 style={{ marginTop: 16 }}>
              Built for brands.
              <br />
              <em>Engineered for scale in Lagos.</em>
            </h1>
            <p className="hero-description" style={{ maxWidth: "56ch" }}>
              Founded in Lagos, Nigeria, Miss Kudi Productions bridges the gap between artisanal
              African fashion craftsmanship and industrial-grade B2B garment manufacturing. We
              operate three specialized facilities powered by real-time floor telemetry.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/quote">
                Request Production Quote <span>↗</span>
              </Link>
              <Link className="button button-light" href="/tracker" style={{ border: "1px solid var(--line)" }}>
                Live Order Tracker <span>⌖</span>
              </Link>
            </div>
          </div>

          <figure className="marketing-hero-figure">
            <img
              src="/images/hero-lagos-atelier.jpg"
              alt="Miss Kudi Productions flagship Lagos garment atelier with pattern tables and master tailors"
              width={960}
              height={680}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="image-caption">
              <span>YABA FLAGSHIP &amp; VICTORIA ISLAND ATELIER</span>
              <span className="mono">EST. 2018 · LAGOS, NIGERIA</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Craftsmanship & Story Triptych */}
      <section className="section-wrap" style={{ paddingTop: 72, paddingBottom: 84, borderTop: "1px solid var(--line)" }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker">OUR MANUFACTURING PHILOSOPHY</div>
            <h2>
              Where pattern precision meets
              <br />
              <em>transparent floor execution.</em>
            </h2>
          </div>
          <p>
            Every run is governed by graded measurement tolerances, balanced sewing lines and AQL
            2.5 quality audits.
          </p>
        </div>

        <div className="about-triptych-grid">
          <figure className="about-triptych-card">
            <img
              src="/images/pattern-cutting-studio.jpg"
              alt="Pattern designer inspecting graded CAD garment blocks and fabric bolts"
              width={600}
              height={420}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="ticket-label">01 · PATTERN &amp; GRADING STUDIO</span>
              <h3>Digital CAD Blocks &amp; Marker Efficiency</h3>
              <p>
                Our Victoria Island and Yaba pattern designers draft master blocks, grade across
                XS–XXL size ratios, and nest markers to achieve 94%+ fabric utilization.
              </p>
            </figcaption>
          </figure>

          <figure className="about-triptych-card">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85"
              alt="Organized bulk garment production lines in Lagos"
              width={600}
              height={420}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="ticket-label">02 · INDUSTRIAL SEWING LINES</span>
              <h3>Balanced Cut-and-Sew Production</h3>
              <p>
                92+ industrial lockstitch, 5-thread overlock, coverstitch and buttonhole machines
                configured in modular lines for woven tailoring, jersey streetwear and resortwear.
              </p>
            </figcaption>
          </figure>

          <figure className="about-triptych-card">
            <img
              src="/images/qc-finishing-bay.jpg"
              alt="Quality control inspector measuring tailored olive jacket on dress form"
              width={600}
              height={420}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="ticket-label">03 · AQL 2.5 QUALITY &amp; DISPATCH</span>
              <h3>36-Point Inspection &amp; Export Finishing</h3>
              <p>
                Every garment is measured against approved point-of-measure (POM) tolerances,
                vacuum-steam pressed, tagged, and packed with a printable AQL 2.5 QC Passport.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Three Lagos Facilities */}
      <section className="section-wrap" style={{ paddingTop: 84, paddingBottom: 84, background: "#ebe6dd" }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker">02 / OUR THREE LAGOS PLANTS</div>
            <h2>
              Purpose-built facilities across
              <br />
              <em>Yaba, Victoria Island &amp; Ikeja.</em>
            </h2>
          </div>
          <p>
            Combined capacity of 35,500+ units per month with dedicated power redundancy and
            climate-controlled fabric stores.
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

      {/* Leadership & Artisan Roster Preview */}
      <section className="section-wrap" style={{ paddingTop: 84, paddingBottom: 96 }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker">03 / ARTISAN &amp; EXECUTIVE LEADERSHIP</div>
            <h2>
              Specialist leads assigned to
              <br />
              <em>every production job ticket.</em>
            </h2>
          </div>
          <p>
            Meet the directors, pattern designers, cutting masters, master tailors and QC leads
            powering Miss Kudi Productions.
          </p>
        </div>

        <div className="artisan-leadership-grid">
          {leadSpecialists.map((member) => (
            <article key={member.id} className="artisan-leader-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span className="mkp-badge mkp-badge-olive">
                  {ARTISAN_ROLE_LABELS[member.role]}
                </span>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                  {member.qcPassRate}% QC Yield
                </span>
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: 18 }}>{member.name}</h3>
              <div style={{ fontSize: 11.5, color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
                {member.branchName} · {member.station}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>
                {member.specialty}
              </p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link className="button button-dark" href="/quote">
            Start Your Production Brief <span>↗</span>
          </Link>
          <Link className="button button-light" href="/workspace" style={{ border: "1px solid var(--line)" }}>
            Inspect Full Roster in Factory OS <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
