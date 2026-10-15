import Link from "next/link";

export default function About() {
  return (
    <main>
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
    </main>
  );
}
