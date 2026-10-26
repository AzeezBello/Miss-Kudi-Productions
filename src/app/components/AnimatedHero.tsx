"use client";

import React from "react";
import Link from "next/link";

export default function AnimatedHero() {
  return (
    <div className="editorial-hero-showcase">
      {/* Primary LCP Hero Figure — modern-web-guidance: optimize-image-priority & html */}
      <figure className="hero-figure-main">
        <div className="hero-image-frame">
          <img
            src="/images/hero-lagos-atelier.jpg"
            alt="Master tailors and pattern designers working at timber drafting tables inside the Miss Kudi Productions garment atelier in Lagos, Nigeria"
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="hero-main-img"
          />
          <div className="hero-live-telemetry-badge">
            <span className="status-dot" />
            <div>
              <strong>YABA &amp; VI ATELIERS · LIVE FLOOR</strong>
              <span>92 Stations Active · 99.4% AQL 2.5 Pass Yield</span>
            </div>
          </div>
        </div>
        <figcaption className="image-caption">
          <span>FIG 01. LAGOS FLAGSHIP PATTERN &amp; PRODUCTION FLOOR</span>
          <span className="mono">MOQ 50 – 5,000+ PCS · EXPORT READY</span>
        </figcaption>
      </figure>

      {/* Secondary Craftsmanship Strip */}
      <div className="hero-secondary-strip">
        <figure className="hero-mini-card">
          <img
            src="/images/pattern-cutting-studio.jpg"
            alt="Nigerian pattern designer inspecting graded CAD garment blocks and fabric bolts"
            width={480}
            height={320}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>CAD Pattern &amp; Cutting Studio</strong>
            <span>XS–XXL Nest Grading · 94%+ Marker Yield</span>
          </figcaption>
        </figure>

        <figure className="hero-mini-card">
          <img
            src="/images/qc-finishing-bay.jpg"
            alt="Quality control inspector measuring tailored olive blazer on a dress form in Lagos finishing bay"
            width={480}
            height={320}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>AQL 2.5 Quality &amp; Finishing Bay</strong>
            <span>36-Point Spec Audit · Steam &amp; Carton Dispatch</span>
          </figcaption>
        </figure>
      </div>

      {/* Quick Spec Bar */}
      <div className="hero-spec-pills">
        <div className="hero-spec-item">
          <span className="ticket-label">FACILITIES</span>
          <strong>3 Lagos Plants</strong>
        </div>
        <div className="hero-spec-item">
          <span className="ticket-label">TURNAROUND</span>
          <strong>3 – 5 Weeks</strong>
        </div>
        <div className="hero-spec-item">
          <span className="ticket-label">QUALITY STANDARD</span>
          <strong>ISO / AQL 2.5</strong>
        </div>
        <Link href="/tracker" className="hero-spec-link">
          Live Order Tracker <span>→</span>
        </Link>
      </div>
    </div>
  );
}
