import "./globals.css";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

export const metadata = {
  title: "Miss Kudi Productions — B2B Garment Manufacturing in Lagos, Nigeria",
  description:
    "Lagos-based B2B garment manufacturing partner for fashion brands. Bulk cut-and-sew, private-label production, CAD pattern grading, and AQL 2.5 quality control.",
  icons: {
    icon: "/images/mk-logo.svg",
    apple: "/images/mk-logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" data-theme="light">
      <body className="h-full">
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <footer className="footer no-print">
          <div className="footer-top">
            <Link href="/" className="wordmark wordmark-footer">
              <img
                src="/images/mk-logo.jpg"
                alt="MK Productions Emblem"
                width={46}
                height={46}
                className="wordmark-logo-img"
                style={{ width: 46, height: 46, borderColor: "rgba(255, 255, 255, 0.25)" }}
              />
              <span className="wordmark-text-stack">
                <span className="wordmark-main">MISS KUDI</span>
                <span className="wordmark-sub">PRODUCTIONS</span>
              </span>
            </Link>
            <p>
              Your designs. Our expertise.
              <br />
              Production at scale.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button button-light" href="/size-charts">
                Size &amp; Grading Matrix <span>⊞</span>
              </Link>
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
            <span>
              1 Alawode Street, Lagos, Nigeria · Yaba Flagship · Victoria Island Atelier · Ikeja Export Depot
            </span>
            <span>B2B GARMENT MANUFACTURING</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
