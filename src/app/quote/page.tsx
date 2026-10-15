import QuoteForm from "../components/QuoteForm";

export default function Quote() {
  return (
    <main>
      <section className="quote-section section-wrap" id="quote">
        <div className="quote-copy">
          <div className="section-kicker">04 / START A CONVERSATION</div>
          <h2>Have a collection<br />ready for <em>production?</em></h2>
          <p>Share a few details about your order. Our team can review your requirements and follow up to discuss feasibility, specifications and a quotation.</p>
          <div className="quote-detail">
            <span className="detail-mark">↗</span>
            <div>
              <strong>For fashion businesses</strong>
              <span>Bulk orders · Private label · Production inquiries</span>
            </div>
          </div>
          <div className="quote-detail">
            <span className="detail-mark">⌖</span>
            <div>
              <strong>Lagos, Nigeria</strong>
              <span>Inquiries from Nigerian and international brands</span>
            </div>
          </div>
        </div>
        <QuoteForm />
      </section>
    </main>
  );
}
