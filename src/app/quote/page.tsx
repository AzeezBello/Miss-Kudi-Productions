import Link from "next/link";
import QuoteForm from "../components/QuoteForm";
import { productionFaqs } from "../data";

export default function Quote() {
  return (
    <main>
      <section className="quote-section section-wrap" id="quote" style={{ paddingTop: 64 }}>
        <div className="quote-copy">
          <div className="section-kicker">04 / START A PRODUCTION BRIEF</div>
          <h1 style={{ fontSize: "clamp(34px, 4.2vw, 52px)", margin: "18px 0 18px" }}>
            Have a collection
            <br />
            ready for <em>production?</em>
          </h1>
          <p>
            Configure your garment category, exact quantity, and XS–XXL size breakdown to preview
            an instant pro-forma cost estimate, fabric yardage requirement, and printable Factory
            Job Ticket.
          </p>

          {/* Editorial Lookbook Figure — modern-web-guidance: optimize-image-priority & html */}
          <figure className="quote-editorial-figure">
            <img
              src="/images/lagos-atelier-lookbook.jpg"
              alt="Victoria Island fashion atelier showroom featuring olive linen blazers, ecru resortwear shirts and tailored trousers on a brass garment rail"
              width={720}
              height={480}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="image-caption">
              <span>VICTORIA ISLAND ATELIER SHOWROOM · SAMPLE &amp; BULK RUNS</span>
              <span className="mono">MOQ 50+ PCS · AQL 2.5</span>
            </figcaption>
          </figure>

          <div className="quote-detail">
            <span className="detail-mark">↗</span>
            <div>
              <strong>For Fashion Labels &amp; Corporate Buyers</strong>
              <span>
                Bulk cut-and-sew · Private label damask tags · CAD pattern development
              </span>
            </div>
          </div>
          <div className="quote-detail">
            <span className="detail-mark">⌖</span>
            <div>
              <strong>1 Alawode Street, Lagos, Nigeria · Local &amp; International Dispatch</strong>
              <span>
                Head Office &amp; Yaba Flagship Plant · Victoria Island Atelier · Ikeja Export Depot
              </span>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link className="underlined-link" href="/size-charts">
              Open Size &amp; Ratio Calculator <span>↗</span>
            </Link>
            <Link className="underlined-link" href="/tracker">
              Track Existing Job Code <span>→</span>
            </Link>
          </div>

          {/* Native Exclusive Accordion FAQ */}
          <div className="faq-accordion-stack" style={{ marginTop: 32 }}>
            <div className="ticket-label" style={{ marginBottom: 10 }}>
              QUOTATION &amp; ONBOARDING FAQS
            </div>
            {productionFaqs.map((faq, idx) => (
              <details
                key={faq.question}
                name="quote-page-faq"
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
