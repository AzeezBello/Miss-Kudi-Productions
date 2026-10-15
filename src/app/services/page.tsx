import { services } from "../data";

export default function Services() {
  return (
    <main>
      <section className="capabilities section-wrap" id="capabilities">
        <div className="section-heading">
          <div>
            <div className="section-kicker">02 / WHAT WE DO</div>
            <h2>Manufacturing that<br />
              <em>moves your brand forward.</em>
            </h2>
          </div>
        </div>
        <p>Production services shaped around your garment, approved specifications and order requirements.</p>
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
    </main>
  );
}
