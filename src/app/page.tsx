import Link from "next/link";
import { services, steps } from "./data";
import AnimatedHero from "./components/AnimatedHero";

export default function Home() {
  return (
    <main>
      <div className="announcement">B2B GARMENT MANUFACTURING · LAGOS, NIGERIA</div>


      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A PRODUCTION PARTNER FOR FASHION BRANDS</p>
          <h1>Your designs.<br />Our expertise.<br /><em>Production at scale.</em></h1>
          <p className="hero-description">
            We help fashion brands turn approved designs, patterns and specifications into finished garments — made in bulk and prepared for your business.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="#quote">Discuss your production <span>↗</span></Link>
            <Link className="text-link" href="#capabilities">Explore capabilities <span>↓</span></Link>
          </div>
          <div className="hero-note"><span className="status-dot" /> Lagos-based · Serving Nigerian and international brands</div>
        </div>
        <div className="hero-visual">
          <AnimatedHero />

          <div className="vertical-label">MISS KUDI PRODUCTIONS — APPAREL MANUFACTURING</div>
        </div>
      </section>

      <section className="intro section-wrap" id="about">
        <div className="section-kicker">01 / WHO WE ARE</div>
        <div className="intro-content">
          <h2>Built for brands.<br /><span>Ready for the next run.</span></h2>
          <div className="intro-body">
            <p>Miss Kudi Productions is a Lagos-based garment manufacturing partner for labels that need to produce collections in volume.</p>
            <p>Bring your design, print, pattern or technical specifications. We work with you to define the production requirements and manufacture to the scope agreed for your order.</p>
            <Link className="underlined-link" href="#quote">Tell us what you’re making <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="capabilities section-wrap" id="capabilities">
        <div className="section-heading">
          <div>
            <div className="section-kicker">02 / WHAT WE DO</div>
            <h2>Manufacturing that<br /><em>moves your brand forward.</em></h2>
          </div>
          <p>Production services shaped around your garment, approved specifications and order requirements.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-image" style={{ backgroundImage: `url("${service.image}")` }} role="img" aria-label={service.alt}>
                <span className="service-number">{service.number}</span>
              </div>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="capability-note">Service scope, minimum quantities and timelines are confirmed for each garment and order.</p>
      </section>

      <section className="process-section" id="process">
        <div className="process-inner section-wrap">
          <div className="section-kicker">03 / HOW WE WORK</div>
          <div className="process-heading">
            <h2>From your brief<br />to <em>bulk production.</em></h2>
            <p>A clear process helps both teams align on the product, the requirements and what success looks like before production begins.</p>
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
          <h2>Have a collection<br />ready for <em>production?</em></h2>
          <p>Share a few details about your order. Our team can review your requirements and follow up to discuss feasibility, specifications and a quotation.</p>
          <div className="quote-detail"><span className="detail-mark">↗</span><div><strong>For fashion businesses</strong><span>Bulk orders · Private label · Production inquiries</span></div></div>
          <div className="quote-detail"><span className="detail-mark">⌖</span><div><strong>Lagos, Nigeria</strong><span>Inquiries from Nigerian and international brands</span></div></div>
        </div>
        <QuoteForm />
      </section>


    </main>
  );
}

function QuoteForm() {
  return (
    <form className="quote-form" action="/api/inquiry" method="post">
      <div className="form-heading">
        <span>PRODUCTION INQUIRY</span>
        <p>Fields marked * are required.</p>
      </div>
      <label>Company or brand name *<input name="company" required placeholder="Your fashion brand" /></label>
      <div className="form-row">
        <label>Business email *<input type="email" name="email" required placeholder="you@brand.com" /></label>
        <label>Phone / WhatsApp<input type="tel" name="phone" placeholder="+234 ..." /></label>
      </div>
      <div className="form-row">
        <label>Garment category *
          <select name="garment" required defaultValue="">
            <option value="" disabled>Select category</option>
            <option>T-shirts and tops</option><option>Dresses and womenswear</option>
            <option>Shirts and menswear</option><option>Trousers and bottoms</option>
            <option>Uniforms and workwear</option><option>Sportswear and activewear</option>
            <option>Mixed collection / other</option>
          </select>
        </label>
        <label>Estimated quantity *
          <select name="quantity" required defaultValue="">
            <option value="" disabled>Select quantity</option>
            <option>Under 100 pieces</option><option>100–499 pieces</option>
            <option>500–999 pieces</option><option>1,000–4,999 pieces</option>
            <option>5,000+ pieces</option><option>To be discussed</option>
          </select>
        </label>
      </div>
      <label>What do you have ready?
        <select name="specifications" defaultValue="Designs and patterns">
          <option>Designs and patterns</option><option>Technical pack</option>
          <option>Prints and specifications</option><option>Sample garment</option>
          <option>Need help defining production specifications</option>
        </select>
      </label>
      <label>Tell us about your order *<textarea name="details" required rows={4} placeholder="Garment details, size range, fabric, branding, target delivery date..." /></label>
      <button className="button button-dark form-submit" type="submit">Send production inquiry <span>↗</span></button>
      <p className="form-privacy">Please do not submit confidential design files until a secure file-sharing process has been agreed.</p>
    </form>
  );
}