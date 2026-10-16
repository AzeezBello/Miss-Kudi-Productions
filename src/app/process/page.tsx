import Link from "next/link";
import { steps } from "../data";
export default function Process() {
  return (
    <main>
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
          <div className="process-cta" style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link className="button button-dark" href="/quote">Start your project <span>↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
