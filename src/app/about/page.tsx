import Link from "next/link";
import { facilityHighlights } from "../data";

const PUBLIC_CRAFT_LEADS = [
  {
    role: "Production & Client Strategy",
    name: "Kudi Alabi",
    facility: "Yaba Flagship Production Plant",
    focus:
      "Multi-facility capacity planning, private-label collection scheduling and international brand partnerships.",
    metric: "99.6% On-Time Dispatch",
  },
  {
    role: "Senior Pattern Designer",
    name: "Chioma Nwosu",
    facility: "Victoria Island Pattern & Sample Atelier",
    focus:
      "CAD master block drafting, couture draping, first-fit toile development and XS–XXL size grading.",
    metric: "99.4% Fit Approval",
  },
  {
    role: "Master Cutter & Marker Lead",
    name: "Segun Adeyemi",
    facility: "Yaba Flagship Production Plant",
    focus:
      "24-hour fabric relaxation, zero-waste marker nesting, shade-lot bundling and precision multi-ply cutting.",
    metric: "94.8% Marker Yield",
  },
  {
    role: "Master Tailor & Sewing Line Lead",
    name: "Funke Olatunji",
    facility: "Yaba Flagship Production Plant",
    focus:
      "Balanced industrial lockstitch, French-seam resortwear, heavyweight streetwear and structured outerwear lines.",
    metric: "98.9% Inline Pass Rate",
  },
  {
    role: "AQL 2.5 Quality Control Lead",
    name: "Ngozi Eze",
    facility: "Ikeja Workwear & Export Finishing Depot",
    focus:
      "36-point garment measurement verification, seam tensile testing, steam finishing and export carton sign-off.",
    metric: "AQL 2.5 Certified",
  },
  {
    role: "Atelier Sample & Merchandising Lead",
    name: "Zainab Lawal",
    facility: "Victoria Island Pattern & Sample Atelier",
    focus:
      "Tech-pack onboarding, trim & woven label sourcing, and pre-production sample approvals for fashion labels.",
    metric: "7–14 Day Sample Lead",
  },
];

export default function About() {
  const [flagshipPlant, ...secondaryPlants] = facilityHighlights;

  return (
    <main>
      {/* Editorial Hero Banner */}
      <section className="marketing-hero section-wrap">
        <div className="marketing-hero-grid">
          <div>
            <div className="section-kicker mono">01 / ABOUT MISS KUDI PRODUCTIONS</div>
            <h1 style={{ marginTop: 16 }}>
              Built for brands.
              <br />
              <em>Engineered for scale in Lagos.</em>
            </h1>
            <p className="hero-description" style={{ maxWidth: "56ch" }}>
              Founded in Lagos, Nigeria, Miss Kudi Productions bridges artisanal fashion
              craftsmanship with industrial B2B garment manufacturing across three specialized
              production facilities.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/quote">
                Request Production Quote <span>↗</span>
              </Link>
              <Link
                className="button button-light"
                href="/tracker"
                style={{ border: "1px solid var(--line)" }}
              >
                Track Your Order <span>⌖</span>
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
              <span>HEAD OFFICE: 1 ALAWODE STREET · YABA &amp; VI ATELIER</span>
              <span className="mono">EST. 2018 · LAGOS, NIGERIA</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Craftsmanship & Story Triptych */}
      <section
        className="section-wrap"
        style={{ paddingTop: 72, paddingBottom: 84, borderTop: "1px solid var(--line)" }}
      >
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">OUR MANUFACTURING PHILOSOPHY</div>
            <h2>
              Where pattern precision meets
              <br />
              <em>disciplined floor execution.</em>
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
              <span className="ticket-label mono">01 · PATTERN &amp; GRADING STUDIO</span>
              <h3>Digital CAD Blocks &amp; Marker Efficiency</h3>
              <p>
                Our Victoria Island and Yaba pattern designers draft master blocks, grade across
                XS–XXL size ratios, and nest markers to achieve 94%+ fabric utilization.
              </p>
            </figcaption>
          </figure>

          <figure className="about-triptych-card">
            <img
              src="/images/sewing-production-line.jpg"
              alt="Master tailors operating industrial sewing machines in Lagos"
              width={600}
              height={420}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="ticket-label mono">02 · INDUSTRIAL SEWING LINES</span>
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
              <span className="ticket-label mono">03 · AQL 2.5 QUALITY &amp; DISPATCH</span>
              <h3>36-Point Inspection &amp; Export Finishing</h3>
              <p>
                Every garment is measured against approved point-of-measure (POM) tolerances,
                vacuum-steam pressed, tagged, and packed with a printable AQL 2.5 QC Passport.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Three Lagos Facilities — Asymmetrical Flagship Spotlight (taste-skill) */}
      <section className="section-wrap" style={{ paddingTop: 84, paddingBottom: 84, background: "#ebe6dd" }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">02 / OUR THREE LAGOS PLANTS</div>
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

        <div className="taste-plant-spotlight-grid">
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

      {/* Craftsmanship Department Leads */}
      <section className="section-wrap" style={{ paddingTop: 84, paddingBottom: 96 }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">03 / CRAFTSMANSHIP DEPARTMENT LEADS</div>
            <h2>
              Specialist leads assigned to
              <br />
              <em>every client production run.</em>
            </h2>
          </div>
          <p>
            Every brand order is paired with a dedicated Pattern Designer, Cutting Master, Sewing
            Line Lead and Quality Control Inspector.
          </p>
        </div>

        <div className="artisan-leadership-grid">
          {PUBLIC_CRAFT_LEADS.map((member) => (
            <article key={member.name} className="artisan-leader-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span className="mkp-badge mkp-badge-olive">{member.role}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                  {member.metric}
                </span>
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: 18 }}>{member.name}</h3>
              <div style={{ fontSize: 11.5, color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
                {member.facility}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>
                {member.focus}
              </p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link className="button button-dark" href="/quote">
            Start Your Production Brief <span>↗</span>
          </Link>
          <Link className="button button-light" href="/services" style={{ border: "1px solid var(--line)" }}>
            View Production Capabilities <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
