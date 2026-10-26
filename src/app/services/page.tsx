import Link from "next/link";
import { garmentCategories, productionFaqs, services } from "../data";

export default function Services() {
  return (
    <main>
      {/* Editorial Hero */}
      <section className="marketing-hero section-wrap">
        <div className="marketing-hero-grid">
          <div>
            <div className="section-kicker mono">02 / MANUFACTURING CAPABILITIES</div>
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

      {/* Core 4 Pillars — 12-Column Asymmetrical Spanning Bento Grid (taste-skill) */}
      <section className="capabilities section-wrap" id="capabilities">
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">FOUR CORE PRODUCTION PILLARS</div>
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
      </section>

      {/* Garment Categories & GSM Specification Index Ledger (taste-skill) */}
      <section className="section-wrap" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div className="section-heading">
          <div>
            <div className="section-kicker mono">GARMENT SPECIALIZATIONS &amp; GSM LEDGER</div>
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

        {/* FAQ Accordion */}
        <div style={{ marginTop: 64, maxWidth: 840 }}>
          <div className="section-kicker mono" style={{ marginBottom: 12 }}>
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
