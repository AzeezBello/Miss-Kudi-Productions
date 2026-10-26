"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ACCESS_TIER_LABELS,
  ARTISAN_ROLE_LABELS,
  ArtisanStaff,
  canManageFactory,
  FactoryBranch,
  getActiveBranchId,
  getCurrentSessionUser,
  INITIAL_ARTISANS,
  INITIAL_BRANCHES,
  isSuperAdminUser,
  loadArtisans,
  loadBranches,
  setActiveBranchId,
  setCurrentSessionUser,
} from "../lib/production-os";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const drawerTitleId = useId();

  const [user, setUser] = useState<ArtisanStaff>(INITIAL_ARTISANS[0]);
  const [artisans, setArtisans] = useState<ArtisanStaff[]>(INITIAL_ARTISANS);
  const [branches, setBranches] = useState<FactoryBranch[]>(INITIAL_BRANCHES);
  const [activeBranchId, setBranchState] = useState<string>(
    INITIAL_BRANCHES[0].id
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const syncState = () => {
      setArtisans(loadArtisans());
      setBranches(loadBranches());
      setUser(getCurrentSessionUser());
      setBranchState(getActiveBranchId());
    };
    syncState();
    window.addEventListener("mkp:session-change", syncState);
    window.addEventListener("mkp:branch-change", syncState);
    return () => {
      window.removeEventListener("mkp:session-change", syncState);
      window.removeEventListener("mkp:branch-change", syncState);
    };
  }, [pathname]);

  // modern-web-guidance: light-dismiss-a-dialog for mobile drawer
  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) return;

    if (drawerOpen && !dialog.open) {
      dialog.showModal();
    } else if (!drawerOpen && dialog.open) {
      dialog.close();
    }
  }, [drawerOpen]);

  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) return;
    const onClose = () => setDrawerOpen(false);
    dialog.addEventListener("close", onClose);

    let handleBackdropClick: ((event: MouseEvent) => void) | null = null;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const inside =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!inside) dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("close", onClose);
      if (handleBackdropClick) {
        dialog.removeEventListener("click", handleBackdropClick);
      }
    };
  }, []);

  const handleRoleSwitch = (userId: string) => {
    const target = artisans.find((a) => a.id === userId);
    if (!target) return;
    setCurrentSessionUser(target);
    setUser(target);
    setBranchState(target.branchId);
    if (
      pathname.startsWith("/superadmin") &&
      target.accessTier !== "superadmin"
    ) {
      router.push("/dashboard");
    }
  };

  const handleBranchSwitch = (branchId: string) => {
    setActiveBranchId(branchId);
    setBranchState(branchId);
  };

  const isSuper = isSuperAdminUser(user);
  const canManage = canManageFactory(user);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/size-charts", label: "Size & Ratio" },
    { href: "/tracker", label: "Order Tracker" },
    {
      href: "/dashboard",
      label:
        user.accessTier === "staff"
          ? `My Station (${ARTISAN_ROLE_LABELS[user.role].split(" ")[0]})`
          : "Admin Dashboard",
    },
    ...(isSuper ? [{ href: "/superadmin", label: "Superadmin HQ" }] : []),
    { href: "/workspace", label: "Factory OS" },
    { href: "/quote", label: "Quote" },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Clerk RBAC + NeonDB Cloud Bar */}
      <div className="rbac-topbar no-print">
        <div className="rbac-topbar-inner">
          <div className="rbac-status-group">
            <span className="rbac-cloud-pill">
              <span className="status-dot" />
              NeonDB Serverless · Clerk RBAC
            </span>
            <span className="rbac-tier-badge">
              {user.accessTier.toUpperCase()} · {ARTISAN_ROLE_LABELS[user.role]}
            </span>
          </div>

          <div className="rbac-controls-group">
            <label className="rbac-select-label" htmlFor="global-role-switcher">
              <span>Role Session:</span>
              <select
                id="global-role-switcher"
                className="rbac-select"
                value={user.id}
                onChange={(e) => handleRoleSwitch(e.target.value)}
              >
                <optgroup label="Superadmin (Global Executive HQ)">
                  {artisans
                    .filter((a) => a.accessTier === "superadmin")
                    .map((a) => (
                      <option key={a.id} value={a.id}>
                        ★ {a.name} — Superadmin HQ
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Admin (Factory Plant Managers)">
                  {artisans
                    .filter((a) => a.accessTier === "admin")
                    .map((a) => (
                      <option key={a.id} value={a.id}>
                        ◆ {a.name} — Admin ({a.branchName.split(" ")[0]})
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Staff (Pattern Designers, Tailors, Cutting & QC)">
                  {artisans
                    .filter((a) => a.accessTier === "staff")
                    .map((a) => (
                      <option key={a.id} value={a.id}>
                        ● {a.name} — {ARTISAN_ROLE_LABELS[a.role]}
                      </option>
                    ))}
                </optgroup>
              </select>
            </label>

            {canManage ? (
              <label
                className="rbac-select-label hide-mobile-xs"
                htmlFor="global-branch-switcher"
              >
                <span>Facility:</span>
                <select
                  id="global-branch-switcher"
                  className="rbac-select"
                  value={activeBranchId}
                  onChange={(e) => handleBranchSwitch(e.target.value)}
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <span className="rbac-branch-tag hide-mobile-xs">
                ⌖ {user.branchName}
              </span>
            )}

            <Link href="/login" className="rbac-login-link">
              Clerk Sign In ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Main Responsive Header */}
      <header className="site-header no-print">
        <Link
          href="/"
          className="wordmark"
          aria-label="Miss Kudi Productions home"
        >
          <span className="wordmark-main">MISS KUDI</span>
          <span className="wordmark-sub">PRODUCTIONS</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "nav-link-active" : ""}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions-group">
          <Link
            className="button button-light header-cta hide-tablet"
            href={isSuper ? "/superadmin" : "/dashboard"}
            style={{ border: "1px solid var(--line)" }}
          >
            {isSuper
              ? "Superadmin HQ"
              : user.accessTier === "admin"
              ? "Admin Dashboard"
              : "Staff Dashboard"}{" "}
            <span>⊞</span>
          </Link>
          <Link className="button button-dark header-cta" href="/quote">
            Quote <span>↗</span>
          </Link>

          {/* Accessible 48x48px Mobile Hamburger Button (a11y-debugging tap targets) */}
          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <span className="hamburger-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer (<dialog closedby="any">) */}
      <dialog
        ref={drawerRef}
        {...({ closedby: "any" } as any)}
        aria-labelledby={drawerTitleId}
        className="mobile-nav-drawer no-print"
      >
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <div>
              <div id={drawerTitleId} className="wordmark-main" style={{ fontSize: 18 }}>
                MISS KUDI
              </div>
              <div className="wordmark-sub">FACTORY OS &amp; NAVIGATION</div>
            </div>
            <button
              type="button"
              className="mobile-drawer-close"
              aria-label="Close navigation menu"
              onClick={() => drawerRef.current?.close()}
            >
              ✕
            </button>
          </div>

          <div className="mobile-drawer-session">
            <div className="ticket-label">SIGNED IN VIA CLERK RBAC</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>
              {user.name}
            </div>
            <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
              {ACCESS_TIER_LABELS[user.accessTier]} ·{" "}
              {ARTISAN_ROLE_LABELS[user.role]}
            </div>
            <div style={{ fontSize: 11, color: "var(--ink)", marginTop: 4 }}>
              ⌖ {user.branchName} ({user.station})
            </div>
          </div>

          <nav className="mobile-drawer-links" aria-label="Mobile navigation">
            {navLinks.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mobile-drawer-link ${active ? "active" : ""}`}
                  onClick={() => drawerRef.current?.close()}
                >
                  <span>{item.label}</span>
                  <span>→</span>
                </Link>
              );
            })}
            <Link
              href="/login"
              className="mobile-drawer-link"
              onClick={() => drawerRef.current?.close()}
            >
              <span>Switch Account / Clerk Sign In</span>
              <span>↗</span>
            </Link>
          </nav>
        </div>
      </dialog>

      {/* Mobile Bottom Thumb-Zone Navigation Dock */}
      <nav
        className="mobile-bottom-dock no-print"
        aria-label="Quick mobile navigation"
      >
        <Link
          href="/"
          className={`dock-item ${pathname === "/" ? "active" : ""}`}
        >
          <span className="dock-icon">⌂</span>
          <span>Home</span>
        </Link>
        <Link
          href="/tracker"
          className={`dock-item ${pathname.startsWith("/tracker") ? "active" : ""}`}
        >
          <span className="dock-icon">⌖</span>
          <span>Tracker</span>
        </Link>
        <Link
          href="/dashboard"
          className={`dock-item ${
            pathname.startsWith("/dashboard") ? "active" : ""
          }`}
        >
          <span className="dock-icon">⊞</span>
          <span>
            {user.accessTier === "staff" ? "My Station" : "Dashboard"}
          </span>
        </Link>
        <Link
          href={isSuper ? "/superadmin" : "/workspace"}
          className={`dock-item ${
            pathname.startsWith("/superadmin") ||
            pathname.startsWith("/workspace")
              ? "active"
              : ""
          }`}
        >
          <span className="dock-icon">⚙</span>
          <span>{isSuper ? "HQ Admin" : "Factory OS"}</span>
        </Link>
        <Link
          href="/quote"
          className={`dock-item ${pathname.startsWith("/quote") ? "active" : ""}`}
        >
          <span className="dock-icon">↗</span>
          <span>Quote</span>
        </Link>
      </nav>
    </>
  );
}
