import Link from "next/link";
import { garmentCategories, productionFaqs, services } from "../data";

export default function Services() {
  return (
    <main>
      {/* Editorial Hero */}
      <section className="marketing-hero section-wrap">
        <div className="marketing-hero-grid">
          <div>
            <div className="section-kicker">02 / MANUFACTURING CAPABILITIES</div>
            <h1 style={{ marginTop: 16 }}>
              Manufacturing that
              <br />
              <em>moves your brand forward.</em>
            </h1>
            <p className="hero-description" style={{ maxWidth: "56ch" }}>
              End-to-end B2B garment production engineered around your approved designs, patterns,
              size grading and retail delivery calendar. Choose Cut-Make-Trim (CMT) or Full-Package
              (FOB) manufacturing.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/quote">
                Calculate MOQ &amp; Quote <span>↗</span>
              </Link>
              <Link
                className="button button-light"
                href="/size-charts"
                style={{ border: "1px solid var(--line)" }}
              >
                Size &amp; Yardage Calculator <span>→</span>
              </Link>
            </div>
          </div>

          <figure className="marketing-hero-figure">
            <img
              src="/images/sewing-production-line.jpg"
              alt="Nigerian master tailors operating industrial lockstitch sewing machines in the Miss Kudi Productions Lagos factory"
              width={960}
              height={680}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="image-caption">
              <span>INDUSTRIAL CUT-AND-SEW LINES · YABA PLANT</span>
              <span className="mono">92+ STATIONS · AQL 2.5 CERTIFIED</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Core 4 Pillars with Detailed Deliverables */}
      <section className="capabilities section-wrap" id="capabilities">
        <div className="section-heading">
          <div>
            <div className="section-kicker">FOUR CORE PRODUCTION PILLARS</div>
            <h2>
              Complete garment execution
              <br />
              <em>under one roof.</em>
            </h2>
          </div>
          <p>
            Every service tier includes dedicated artisan station assignment and live Job Code
            visibility.
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
      </section>

      {/* Garment Categories & GSM Matrix */}
      <section className="section-wrap" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker">GARMENT SPECIALIZATIONS</div>
            <h2>
              What we produce across
              <br />
              <em>our Lagos lines.</em>
            </h2>
          </div>
          <p>
            Specialized machine attachments and needle gauges calibrated for knits, wovens, silks
            and heavy twill.
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

        {/* FAQ Accordion */}
        <div style={{ marginTop: 64, maxWidth: 840 }}>
          <div className="section-kicker" style={{ marginBottom: 12 }}>
            TECHNICAL &amp; MOQ FAQS
          </div>
          <div className="faq-accordion-stack">
            {productionFaqs.map((faq, idx) => (
              <details
                key={faq.question}
                name="services-faq"
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

        <div className="cta-wrapper" style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link className="button button-dark" href="/quote">
            Start Your Production Project <span>↗</span>
          </Link>
          <Link className="button button-light" href="/process" style={{ border: "1px solid var(--line)" }}>
            Inspect 5-Stage Production Process <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
