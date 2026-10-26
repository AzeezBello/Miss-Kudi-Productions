import "./globals.css";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

export const metadata = {
  title: "Miss Kudi Productions — B2B Garment Manufacturing & Factory OS",
  description:
    "Lagos-based B2B garment manufacturing partner powered by NeonDB Serverless Postgres & Clerk RBAC across Superadmin, Admin, Pattern Designers, Tailors, and Quality Control.",
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
              <span className="wordmark-main">MISS KUDI</span>
              <span className="wordmark-sub">PRODUCTIONS</span>
            </Link>
            <p>
              Your designs. Our expertise.
              <br />
              Production at scale.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button button-light" href="/dashboard">
                Role Dashboards <span>⊞</span>
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
              Lagos, Nigeria · NeonDB Serverless Postgres &amp; Clerk RBAC
            </span>
            <span>B2B GARMENT MANUFACTURING</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
