import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Miss Kudi Productions — B2B Garment Manufacturing & Factory OS",
  description:
    "Lagos-based B2B garment manufacturing partner with live MOQ estimator, size-grading matrix, 5-stage production tracker, and artisan floor operations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" data-theme="light">
      <body className="h-full">
        <header className="site-header no-print">
          <Link href="/" className="wordmark" aria-label="Miss Kudi Productions home">
            <span className="wordmark-main">MISS KUDI</span>
            <span className="wordmark-sub">PRODUCTIONS</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/process">Process</Link>
            <Link href="/size-charts">Size &amp; Ratio</Link>
            <Link href="/tracker">Order Tracker</Link>
            <Link href="/workspace">Factory OS</Link>
            <Link href="/quote">Quote</Link>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link
              className="button button-light header-cta"
              href="/workspace"
              style={{ border: "1px solid var(--line)" }}
            >
              Factory OS <span>⚙</span>
            </Link>
            <Link className="button button-dark header-cta" href="/quote">
              Request a quote <span>↗</span>
            </Link>
          </div>
        </header>
        {children}
        <footer className="footer no-print">
          <div className="footer-top">
            <Link href="/" className="wordmark wordmark-footer">
              <span className="wordmark-main">MISS KUDI</span>
              <span className="wordmark-sub">PRODUCTIONS</span>
            </Link>
            <p>
              Your designs. Our expertise.
              <br />
              Production at scale.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button button-light" href="/tracker">
                Track Production Run <span>⌖</span>
              </Link>
              <Link className="button button-light" href="/quote">
                Start a production inquiry <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Miss Kudi Productions</span>
            <span>Lagos, Nigeria · Pattern Studio, Sewing Lines &amp; QC</span>
            <span>B2B GARMENT MANUFACTURING</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
