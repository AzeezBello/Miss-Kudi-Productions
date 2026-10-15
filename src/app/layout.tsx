import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Miss Kudi Productions",
  description: "B2B garment manufacturing partner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" data-theme="light">
      <body className="h-full">
        <header className="site-header">
          <Link href="/" className="wordmark" aria-label="Miss Kudi Productions home">
            <span className="wordmark-main">MISS KUDI</span>
            <span className="wordmark-sub">PRODUCTIONS</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/process">Process</Link>
            <Link href="/quote">Quote</Link>
          </nav>
          <Link className="button button-dark header-cta" href="/quote">Request a quote <span>↗</span></Link>
        </header>
        {children}
        <footer className="footer">
          <div className="footer-top">
            <Link href="/" className="wordmark wordmark-footer">
              <span className="wordmark-main">MISS KUDI</span>
              <span className="wordmark-sub">PRODUCTIONS</span>
            </Link>
            <p>Your designs. Our expertise.<br/>Production at scale.</p>
            <Link className="button button-light" href="/quote">Start a production inquiry <span>↗</span></Link>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Miss Kudi Productions</span>
            <span>Lagos, Nigeria</span>
            <span>B2B GARMENT MANUFACTURING</span>
          </div>
        </footer>
      </body>
    </html>
  );
}